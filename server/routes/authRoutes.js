
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

// REGISTER - Create a new user account
router.post('/register', async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      terms,
    } = req.body

    // Check required fields
    if (
      typeof fullName !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof confirmPassword !== 'string' ||
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields.',
      })
    }

    // Check terms acceptance
    if (terms !== true) {
      return res.status(400).json({
        success: false,
        message: 'You must accept the Terms of Service and Privacy Policy.',
      })
    }

    // Validate email
    const normalizedEmail = email.trim().toLowerCase()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      })
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.',
      })
    }

    // Confirm passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.',
      })
    }

    // Check JWT configuration
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Authentication configuration is missing.',
      })
    }

    // Check if email already exists
    const existingUser = await User.findOne({
      email: normalizedEmail,
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      })
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user account
    const user = await User.create({
      name: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      termsAcceptedAt: new Date(),
    })

    // Generate authentication token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(201).json({
      success: true,
      message: 'Account registered successfully!',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    })
  } catch (error) {
    console.error('Registration error:', error.message)

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      })
    }

    res.status(500).json({
      success: false,
      message: 'Server error while registering account.',
    })
  }
})

module.exports = router
