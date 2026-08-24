import { useEffect, useState } from 'react'
import { fetchCollection } from '../utils/api.js'

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : '/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users', usersEndpoint).then(setUsers).catch((err) => setError(err.message)) }, [])
  return <section className="page-section"><div className="page-heading"><div><p className="eyebrow">YOUR COMMUNITY</p><h1>Users</h1><p>Meet the people making consistency a habit.</p></div><span className="item-count">{users.length} profiles</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="user-grid">{users.length ? users.map((user, index) => <article className="user-tile" key={user._id || user.id || index}><div className="avatar">{(user.name || user.username || 'A').charAt(0).toUpperCase()}</div><div><h2>{user.name || user.username || 'Unnamed user'}</h2><p>{user.email || user.goal || 'Octofit member'}</p></div></article>) : <p className="empty-state">No users available.</p>}</div></section>
}

export default Users