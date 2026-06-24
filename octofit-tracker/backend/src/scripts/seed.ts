/*
Seed the octofit_db database with test data.
This script creates realistic sample users, teams, activities, leaderboard entries, and workouts.
*/

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from '../models/User'
import { Team } from '../models/Team'
import { Activity } from '../models/Activity'
import { Workout } from '../models/Workout'
import { Leaderboard } from '../models/Leaderboard'

dotenv.config()

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

const seed = async () => {
  await mongoose.connect(mongoUrl)
  console.log('Seed the octofit_db database with test data')

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ])

  const users = await User.create([
    { name: 'Avery Morgan', email: 'avery@example.com', role: 'coach' },
    { name: 'Jordan Lee', email: 'jordan@example.com', role: 'user' },
    { name: 'Taylor Kim', email: 'taylor@example.com', role: 'user' }
  ])

  const teams = await Team.create([
    { name: 'Mountain Movers', members: [users[0]._id, users[1]._id] },
    { name: 'Sunrise Sprinters', members: [users[1]._id, users[2]._id] }
  ])

  const workouts = await Workout.create([
    {
      name: 'Morning Cardio Blast',
      focusArea: 'cardio',
      difficulty: 'medium',
      durationMinutes: 30,
      recommendedFor: ['beginners', 'intermediate']
    },
    {
      name: 'Strength & Core Builder',
      focusArea: 'strength',
      difficulty: 'hard',
      durationMinutes: 45,
      recommendedFor: ['intermediate', 'advanced']
    }
  ])

  const activities = await Activity.create([
    {
      user: users[1]._id,
      type: 'Running',
      durationMinutes: 45,
      caloriesBurned: 520,
      distanceKm: 8.2
    },
    {
      user: users[2]._id,
      type: 'Yoga',
      durationMinutes: 60,
      caloriesBurned: 230,
      distanceKm: 0
    }
  ])

  const leaderboardEntries = await Leaderboard.create([
    { user: users[1]._id, rank: 1, points: 1240, team: teams[0]._id },
    { user: users[2]._id, rank: 2, points: 980, team: teams[1]._id }
  ])

  console.log('Seed data created:')
  console.log({ users: users.length, teams: teams.length, workouts: workouts.length, activities: activities.length, leaderboard: leaderboardEntries.length })

  await mongoose.disconnect()
  console.log('MongoDB connection closed')
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
