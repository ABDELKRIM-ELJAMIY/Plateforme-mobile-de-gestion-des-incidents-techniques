require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB:', err.message);
  });
