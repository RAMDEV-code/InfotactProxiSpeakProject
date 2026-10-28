const API_URL = 'http://localhost:5000/api/participants';

export async function getParticipants() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch participants');
  }

  const result = await response.json();
  return result.data;
}

export async function createParticipant(participant) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(participant),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Could not add participant');
  }

  return result.data;
}
