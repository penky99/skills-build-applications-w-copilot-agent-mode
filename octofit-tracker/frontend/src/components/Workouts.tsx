import { useState, useEffect } from 'react'
import { fetchApiData } from '../utils/api'

interface Workout {
  _id: string
  name: string
  focusArea: string
  difficulty: string
  durationMinutes: number
  recommendedFor: string[]
  createdAt: string
}

export function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true)
        const data = await fetchApiData<Workout>('workouts/')
        setWorkouts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load workouts')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  if (loading) return <div className="alert alert-info">Loading workouts...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found</p>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">
                    <strong>Focus:</strong> {workout.focusArea}
                    <br />
                    <strong>Difficulty:</strong> {workout.difficulty}
                    <br />
                    <strong>Duration:</strong> {workout.durationMinutes} minutes
                  </p>
                  <div className="mb-2">
                    <strong>Recommended for:</strong>
                    <div>
                      {workout.recommendedFor.map((level, idx) => (
                        <span key={idx} className="badge bg-primary me-1">
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
