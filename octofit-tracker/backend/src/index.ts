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

app.use(cors())
app.use(express.json())

app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', apiBaseUrl })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`)
    if (process.env.CODESPACE_NAME) {
      console.log(`Codespaces API URL: ${apiBaseUrl}`)
    }
  })
})
