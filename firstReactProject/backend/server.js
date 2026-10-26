const express = require("express");

const app = express();
const PORT = 5000;

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