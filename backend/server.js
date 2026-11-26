const express = require("express")
const cors = require("cors")
require("dotenv").config()
const db = require("./db")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Test route
app.get("/", (req, res) => {
  res.send("WebPOS Backend is running successfully!")
})

// Get all products
app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products"

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching products:", err.message)
      return res.status(500).json({
        message: "Unable to fetch products",
      })
    }

    res.json(results)
  })
})

// Server port
const PORT = process.env.PORT || 5000
// Start server
// Save a completed sale
app.post("/api/sales", (req, res) => {
  res.json({
    message: "Sales route is ready for transaction data",
  })
})
app.listen(PORT, () => {
  console.log(`WebPOS server running on port ${PORT}`)
})