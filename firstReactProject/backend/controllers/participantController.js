const participants = require('../Models/participantModel.js');

// GET all participants
function getAllParticipants(req, res) {
  res.status(200).json({
    success: true,
    count: participants.length,
    data: participants,
  });
}

// GET one participant
function getParticipantById(req, res) {
  const participantId = Number(req.params.id);

  if (!Number.isInteger(participantId) || participantId < 1) {
    return res.status(400).json({
      success: false,
      message: 'Invalid participant ID',
    });
  }

  const participant = participants.find(
    (person) => person.id === participantId
  );

  if (!participant) {
    return res.status(404).json({
      success: false,
      message: 'Participant not found',
    });
  }

  res.status(200).json({
    success: true,
    data: participant,
  });
}

// CREATE participant
function createParticipant(req, res) {
  const { name, role, x, y } = req.body;

  if (
    typeof name !== 'string' ||
    !name.trim() ||
    typeof role !== 'string' ||
    !role.trim()
  ) {
    return res.status(400).json({
      success: false,
      message: 'A valid name and role are required',
    });
  }

  if (
    !Number.isFinite(x) ||
    !Number.isFinite(y) ||
    x < 0 ||
    y < 0
  ) {
    return res.status(400).json({
      success: false,
      message: 'Coordinates must be non-negative numbers',
    });
  }

  const newParticipant = {
    id: Math.max(0, ...participants.map((person) => person.id)) + 1,
    name: name.trim(),
    role: role.trim(),
    x,
    y,
    status: 'Listening',
  };

  participants.push(newParticipant);

  res.status(201).json({
    success: true,
    message: 'Participant created successfully',
    data: newParticipant,
  });
}

module.exports = {
  getAllParticipants,
  getParticipantById,
  createParticipant,
};
