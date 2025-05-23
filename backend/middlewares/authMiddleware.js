const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { jwtSecret } = require('../config/jwtConfig.js');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
  } else {
    return res.status(401).json({ message: 'Accès refusé, token manquant' });
  }
};

module.exports = { protect };
