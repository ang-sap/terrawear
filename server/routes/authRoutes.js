
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      confirmPassword,
      terms,
    } = req.body

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

    if (terms !== true) {
      return res.status(400).json({
        success: false,
        message: 'You must accept the Terms of Service and Privacy Policy.',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.',
      })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.',
      })
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Authentication configuration is missing.',
      })
    }

    const existingUser = await User.findOne({
      email: normalizedEmail,
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists.',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name: fullName.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      termsAcceptedAt: new Date(),
    })

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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your email and password.',
      })
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Authentication configuration is missing.',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const user = await User.findOne({
      email: normalizedEmail,
    }).select('+password')

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    })
  } catch (error) {
    console.error('Login error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Server error while logging in.',
    })
  }
})

module.exports = router
