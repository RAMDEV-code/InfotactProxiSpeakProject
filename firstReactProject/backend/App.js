const express = require('express');
const cors = require('cors');

const participantRoutes = require('./Routes/participantRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ProxiSpeak backend is running!');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'ProxiSpeak API is healthy',
  });
});

app.use('/api/participants', participantRoutes);

module.exports = app;
