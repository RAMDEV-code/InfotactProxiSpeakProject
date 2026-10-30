const express = require('express');

const router = express.Router();

const {
  getAllParticipants,
  getParticipantById,
  createParticipant,
} = require('../controllers/participantController');

// GET all participants
router.get('/', getAllParticipants);

// GET one participant by ID
router.get('/:id', getParticipantById);

// CREATE a participant
router.post('/', createParticipant);

module.exports = router;
