import { useEffect, useState } from 'react'
import { fetchCollection } from '../utils/api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setWorkouts).catch((err) => setError(err.message)) }, [])
  return <section className="page-section"><div className="page-heading"><div><p className="eyebrow">TRAIN WITH INTENT</p><h1>Workouts</h1><p>Suggestions shaped around your next strong session.</p></div><span className="item-count">{workouts.length} plans</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="tile-grid">{workouts.length ? workouts.map((workout, index) => <article className="info-tile workout-tile" key={workout._id || workout.id || index}><span className="tile-number">{String(index + 1).padStart(2, '0')}</span><h2>{workout.name || workout.title || 'Workout plan'}</h2><p>{workout.description || workout.type || workout.category || 'Ready when you are.'}</p><span className="tile-meta">{workout.duration ? `${workout.duration} min` : workout.level || 'All levels'}</span></article>) : <p className="empty-state">No workouts available.</p>}</div></section>
}

export default Workouts