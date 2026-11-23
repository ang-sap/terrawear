
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dns = require('dns')

require('dotenv').config()

// Use public DNS resolvers for MongoDB Atlas SRV lookup
dns.setServers(['1.1.1.1', '8.8.8.8'])

const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TerraWear API server is running!',
  })
})

// API routes
app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)

// Connect to MongoDB and start server
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing. Check your .env file.')
    }

    await mongoose.connect(process.env.MONGODB_URI)

    console.log('MongoDB Atlas connected successfully!')

    app.listen(PORT, () => {
      console.log(`TerraWear server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Server startup failed:', error.message)
    process.exit(1)
  }
}

startServer()
