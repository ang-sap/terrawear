const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/Product')

const router = express.Router()

// CREATE - Add a new product
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: product,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})

// READ - Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

// READ - Get one product by ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID.',
      })
    }

    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      })
    }

    res.status(200).json({
      success: true,
      data: product,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

// UPDATE - Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID.',
      })
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: product,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})

// DELETE - Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product ID.',
      })
    }

    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
})

module.exports = router
