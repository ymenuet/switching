import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import formations from './data/formations.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API running')
})

app.get('/api/formations', (req, res) => {
  res.json(formations)
})

app.get('/api/formations/:id', (req, res) => {
  const formation = formations.find((f) => f.id == req.params.id)
  res.json(formation)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
)
