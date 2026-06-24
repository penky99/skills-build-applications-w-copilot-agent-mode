import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Users } from './components/Users'
import { Teams } from './components/Teams'
import { Activities } from './components/Activities'
import { Workouts } from './components/Workouts'
import { Leaderboard } from './components/Leaderboard'
import { getApiBaseUrl } from './utils/api'
import './App.css'

function Home() {
  return (
    <div className="container mt-4">
      <h1>OctoFit Tracker</h1>
      <p className="lead">Multi-tier fitness tracking application</p>
      <div className="alert alert-info">
        <strong>API Base URL:</strong> {getApiBaseUrl()}
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <h3>Features</h3>
          <ul>
            <li>User management and profiles</li>
            <li>Team creation and tracking</li>
            <li>Activity logging</li>
            <li>Workout templates</li>
            <li>Competitive leaderboard</li>
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Getting Started</h3>
          <p>Navigate using the menu above to explore:</p>
          <ul>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/activities">Activities</Link></li>
            <li><Link to="/workouts">Workouts</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🏋️ OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow-1">
          <div className="container py-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/workouts" element={<Workouts />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3 mt-4">
          <p className="mb-0">© 2026 OctoFit Tracker | React 19 + Vite + Node.js API</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
