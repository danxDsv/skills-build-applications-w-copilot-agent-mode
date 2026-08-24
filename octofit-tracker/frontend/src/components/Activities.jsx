import { useEffect, useState } from 'react'
import { fetchCollection } from '../utils/api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((err) => setError(err.message))
  }, [])

  return <CollectionPage title="Activity log" subtitle="Recent movement across your teams." items={activities} error={error} columns={['user', 'type', 'duration', 'date']} />
}

function CollectionPage({ title, subtitle, items, error, columns }) {
  return <section className="page-section"><div className="page-heading"><div><p className="eyebrow">OCTOFIT TRACKER</p><h1>{title}</h1><p>{subtitle}</p></div><span className="item-count">{items.length} records</span></div>{error && <div className="alert alert-warning">{error}</div>}<div className="data-panel"><div className="table-responsive"><table className="table align-middle"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{items.length ? items.map((item, index) => <tr key={item._id || item.id || index}>{columns.map((column) => <td key={column}>{String(item[column] ?? item.userName ?? item.name ?? '-')}</td>)}</tr>) : <tr><td colSpan={columns.length} className="empty-state">No records available.</td></tr>}</tbody></table></div></div></section>
}

export default Activities