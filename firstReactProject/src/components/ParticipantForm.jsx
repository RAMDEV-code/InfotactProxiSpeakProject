
import { useState } from 'react';

function ParticipantForm({ onAddParticipant }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    setAdding(true);
    setError('');

    try {
      await onAddParticipant({ name, role });
      setName('');
      setRole('');
    } catch (err) {
      setError(err.message);
    } finally {
      setAdding(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Participant name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Participant role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
          required
        />

        <button type="submit" disabled={adding}>
          {adding ? 'Adding...' : 'Add participant'}
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default ParticipantForm;
