import { useState, useEffect } from 'react'
import { fetchApiData } from '../utils/api'

interface LeaderboardUser {
  _id: string
  name: string
  email: string
}

interface LeaderboardTeam {
  _id: string
  name: string
}

interface LeaderboardEntry {
  _id: string
  user: LeaderboardUser
  rank: number
  points: number
  team?: LeaderboardTeam
  updatedAt: string
}

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true)
        const data = await fetchApiData<LeaderboardEntry>('leaderboard')
        setEntries(data.sort((a, b) => a.rank - b.rank))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2>Leaderboard</h2>
      {entries.length === 0 ? (
        <p>No leaderboard entries found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Points</th>
              <th>Team</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry._id}>
                <td>
                  <strong>#{entry.rank}</strong>
                </td>
                <td>{entry.user.name}</td>
                <td>
                  <span className="badge bg-success">{entry.points}</span>
                </td>
                <td>{entry.team ? entry.team.name : '-'}</td>
                <td>{new Date(entry.updatedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
