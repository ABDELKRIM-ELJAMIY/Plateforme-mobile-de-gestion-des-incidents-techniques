const express = require('express');
const cors = require('cors');
const ticketRoutes = require('./routes/ticketRoute');
const authRoutes = require('./routes/authRoute');

const app = express();
app.use(express.json()); 


app.use(cors());
app.use(express.json());


app.use('/api/tickets', ticketRoutes); 
app.use('/api/auth', authRoutes);     

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

module.exports = app;
