
import ParticipantCard from './participantCard.jsx';

function OfficeRoom({ participants }) {
  return (
    <div className="office-room">
      {participants.map((participant) => (
        <div
          className="office-person"
          key={participant.id}
          style={{
            left: `${Math.min(participant.x, 500)}px`,
            top: `${participant.y}px`,
          }}
        >
          <ParticipantCard
            name={participant.name}
            role={participant.role}
            status={participant.status}
          />
        </div>
      ))}
    </div>
  );
}

export default OfficeRoom;
