import { Router } from 'express'
import { Activity } from '../models/Activity'

const router = Router()

router.get('/', async (_, res) => {
  const activities = await Activity.find().populate('user', 'name email').lean()
  res.json({ activities })
})

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body)
  res.status(201).json({ activity })
})

export default router
