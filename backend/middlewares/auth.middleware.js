const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Ticket = require('../models/Ticket');

exports.auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Accès non autorisé. Token manquant' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Utilisateur non trouvé ou token invalide' 
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error('Erreur d\'authentification:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Token invalide'
    });
  }
};


exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Accès refusé. Droits d\'administrateur requis'
    });
  }
};

exports.isAuthorOrAdmin = async (req, res, next) => {
  try {
    const ticketId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;
    
    if (userRole === 'admin') {
      return next();
    }
    
    const ticket = await Ticket.findById(ticketId);
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket non trouvé'
      });
    }
    
    if (ticket.auteur.toString() === userId) {
      return next();
    }
    
    return res.status(403).json({
      success: false,
      message: 'Accès refusé. Vous n\'êtes ni l\'auteur ni un administrateur'
    });
  } catch (error) {
    console.error('Erreur de vérification d\'autorisation:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la vérification d\'autorisation'
    });
  }
};