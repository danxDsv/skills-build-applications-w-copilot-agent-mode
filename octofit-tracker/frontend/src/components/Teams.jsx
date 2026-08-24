import { useEffect, useState } from 'react'
import { fetchCollection } from '../utils/api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('teams').then(setTeams).catch((err) => setError(err.message)) }, [])
  return <section className="page-section"><div className="page-heading"><div><p className="eyebrow">FIND YOUR CREW</p><h1>Teams</h1><p>Small groups, shared goals, steady progress.</p></div><span className="item-count">{teams.length} teams</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="tile-grid">{teams.length ? teams.map((team, index) => <article className="info-tile" key={team._id || team.id || index}><span className="tile-number">{String(index + 1).padStart(2, '0')}</span><h2>{team.name || team.teamName || 'Unnamed team'}</h2><p>{team.description || `${team.members?.length ?? team.memberCount ?? 0} members`}</p></article>) : <p className="empty-state">No teams available.</p>}</div></section>
}

export default Teams