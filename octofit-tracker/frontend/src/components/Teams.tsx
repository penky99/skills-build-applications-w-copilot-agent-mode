import { useState, useEffect } from 'react'
import { fetchApiData } from '../utils/api'

interface TeamMember {
  _id: string
  name: string
  email: string
}

interface Team {
  _id: string
  name: string
  members: TeamMember[]
  createdAt: string
}

export function Teams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true)
        const data = await fetchApiData<Team>('teams')
        setTeams(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  if (loading) return <div className="alert alert-info">Loading teams...</div>
  if (error) return <div className="alert alert-danger">Error: {error}</div>

  return (
    <div>
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p>No teams found</p>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">
                    <strong>Members ({team.members.length}):</strong>
                  </p>
                  <ul className="list-group">
                    {team.members.map((member) => (
                      <li key={member._id} className="list-group-item">
                        {member.name} ({member.email})
                      </li>
                    ))}
                  </ul>
                  <small className="text-muted mt-2 d-block">
                    Created: {new Date(team.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
