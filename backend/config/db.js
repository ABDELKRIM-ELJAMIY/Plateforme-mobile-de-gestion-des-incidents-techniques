const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB connecté: ${process.env.MONGO_URL}`);
  } catch (error) {
    console.error(` Erreur de connexion à MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
