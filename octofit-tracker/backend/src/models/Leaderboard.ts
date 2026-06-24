import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  updatedAt: { type: Date, default: () => new Date() }
})

export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)
