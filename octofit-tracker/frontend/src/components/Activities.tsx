import { useState, useEffect } from 'react'
import { fetchApiData } from '../utils/api'

interface ActivityUser {
  _id: string
  name: string
  email: string
}

interface Activity {
  _id: string
  user: ActivityUser
  type: string
  durationMinutes: number
  caloriesBurned: number
  distanceKm: number
  completedAt: string
}

export function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true)
        const data = await fetchApiData<Activity>('activities/')
        setActivities(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  if (loading) return <div className="alert alert-info">Loading activities...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p>No activities found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories Burned</th>
              <th>Distance (km)</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.user.name}</td>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.caloriesBurned}</td>
                <td>{activity.distanceKm}</td>
                <td>{new Date(activity.completedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
