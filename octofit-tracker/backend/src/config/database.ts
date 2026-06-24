import mongoose from 'mongoose'

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

export const connectDatabase = async () => {
  try {
    await mongoose.connect(mongoUrl)
    console.log('Connected to MongoDB - octofit_db')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}

export const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (err) {
    console.error('MongoDB disconnection error:', err)
  }
}

export default mongoose
