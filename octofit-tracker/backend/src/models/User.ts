import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'user' },
  joinedAt: { type: Date, default: () => new Date() }
})

export const User = mongoose.model('User', userSchema)
