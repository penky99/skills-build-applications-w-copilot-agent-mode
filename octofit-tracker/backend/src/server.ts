import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { apiBaseUrl, port } from './config'
import { connectDatabase } from './config/database'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', apiBaseUrl })
})

// API Routes
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

// Start server
const startServer = async () => {
  await connectDatabase()
  
  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`)
    
    // Display Codespaces URL if available
    if (process.env.CODESPACE_NAME) {
      console.log(`Codespaces API URL: https://${process.env.CODESPACE_NAME}-8001.app.github.dev`)
    }
  })
}

startServer()
