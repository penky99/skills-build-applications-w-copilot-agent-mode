import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  focusArea: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  recommendedFor: [{ type: String }],
  createdAt: { type: Date, default: () => new Date() }
})

export const Workout = mongoose.model('Workout', workoutSchema)
