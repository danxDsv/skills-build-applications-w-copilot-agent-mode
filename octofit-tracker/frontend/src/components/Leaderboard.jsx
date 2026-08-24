import { useEffect, useState } from 'react'
import { fetchCollection } from '../utils/api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setEntries).catch((err) => setError(err.message)) }, [])
  return <section className="page-section"><div className="page-heading"><div><p className="eyebrow">COMPETE TOGETHER</p><h1>Leaderboard</h1><p>See who is setting the pace this week.</p></div><span className="item-count">{entries.length} athletes</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="leaderboard-list">{entries.length ? entries.map((entry, index) => <article className="leaderboard-row" key={entry._id || entry.id || index}><strong className="rank">{entry.rank || index + 1}</strong><div><h2>{entry.userName || entry.username || entry.name || entry.user || 'Athlete'}</h2><p>{entry.team || 'Independent'} · {entry.points ?? entry.score ?? 0} points</p></div><span className="score">{entry.points ?? entry.score ?? 0}</span></article>) : <p className="empty-state">No leaderboard entries available.</p>}</div></section>
}

export default Leaderboard