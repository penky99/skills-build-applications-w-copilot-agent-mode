import { Router } from 'express'
import { Leaderboard } from '../models/Leaderboard'

const router = Router()

router.get('/', async (_, res) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', 'name email')
    .populate('team', 'name')
    .lean()
  res.json({ leaderboard })
})

export default router
