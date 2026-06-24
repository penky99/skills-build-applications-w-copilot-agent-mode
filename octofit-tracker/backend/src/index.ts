import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT ? Number(process.env.PORT) : 8000
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

app.use(cors())
app.use(express.json())

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/example', (_, res) => {
  res.json({ message: 'OctoFit Tracker backend is ready' })
})

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(port, () => {
      console.log(`Backend running on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })
