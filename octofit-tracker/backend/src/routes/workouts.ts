import { Router } from 'express'
import { Workout } from '../models/Workout'

const router = Router()

router.get('/', async (_, res) => {
  const workouts = await Workout.find().lean()
  res.json({ workouts })
})

router.post('/', async (req, res) => {
  const workout = await Workout.create(req.body)
  res.status(201).json({ workout })
})

export default router
