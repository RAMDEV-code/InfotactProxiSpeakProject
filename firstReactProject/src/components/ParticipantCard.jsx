
function ParticipantCard({ name, role, status }) {
  return (
    <div className="desk">
      <div className="avatar">👨🏽‍💻</div>
      <h3>{name}</h3>
      <p>{role}</p>
      <span className={`status ${status.toLowerCase()}`}>
        {status}
      </span>
    </div>
  )
}

export default ParticipantCard
