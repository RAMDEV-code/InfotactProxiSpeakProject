const express = require("express");
const cors = require("cors");



const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("ProxiSpeak backend is running!");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ProxiSpeak API is healthy",
  });
});

app.get("/api/participants", (req, res) => {
  res.status(200).json({
    success: true,
    count: participants.length,
    data: participants
  });
});

app.get("/api/participants/:id", (req, res) => {
  const participantId = Number(req.params.id);

  if (!Number.isInteger(participantId) || participantId < 1) {
  return res.status(400).json({
    success: false,
    message: "Invalid participant ID"
  });
}

  const participant = participants.find((person) => {
    return person.id === participantId;
  });

  if (!participant) {
    return res.status(404).json({
      success: false,
      message: "Participant not found"
    });
  }

  res.status(200).json({
    success: true,
    data: participant
  });
});

app.post("/api/participants", (req, res) => {
  const { name, role, x, y } = req.body;

  if (!name || !role) {
    return res.status(400).json({
      success: false,
      message: "Name and role are required"
    });
  }

  const newParticipant = {
    id: Math.max(0, ...participants.map((person) => person.id)) + 1,
    name,
    role,
    x: Number(x) || 0,
    y: Number(y) || 0,
    status: "Listening"
  };

  participants.push(newParticipant);

  return res.status(201).json({
    success: true,
    message: "Participant created successfully",
    data: newParticipant
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const participants = [
  {
    id: 1,
    name: "Alex",
    role: "Frontend Developer",
    x: 100,
    y: 120,
    status: "Listening"
  },
  {
    id: 2,
    name: "You",
    role: "Participant",
    x: 300,
    y: 220,
    status: "Speaking"
  }
];