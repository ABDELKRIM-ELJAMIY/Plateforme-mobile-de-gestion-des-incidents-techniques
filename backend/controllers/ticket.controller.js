
const TicketService = require('../services/TicketService');


exports.createTicket = async (req, res) => {
  try {
    const ticketData = {
      ...req.body,
      auteur: req.user.id
    };
    
    const ticket = await TicketService.createTicket(ticketData);
    
    res.status(201).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    console.error('Erreur lors de la création du ticket:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création du ticket'
    });
  }
};

exports.getTickets = async (req, res) => {
  try {
    let filter = {};
    
    if (req.user.role !== 'admin') {
      filter.auteur = req.user.id;
    }
    
    
    if (req.query.statut) {
      filter.statut = req.query.statut;
    }
    
    if (req.query.utilisateur && req.user.role === 'admin') {
      filter.auteur = req.query.utilisateur;
    }
    
    const tickets = await TicketService.getTickets(filter);
    
    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des tickets:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des tickets'
    });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await TicketService.getTicketById(req.params.id);
    
    if (req.user.role !== 'admin' && ticket.auteur._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Vous n\'êtes pas autorisé à voir ce ticket'
      });
    }
    
    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du ticket:', error);
    
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération du ticket'
    });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const ticket = await TicketService.updateTicket(req.params.id, req.body);
    
    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du ticket:', error);
    
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la mise à jour du ticket'
    });
  }
};


exports.deleteTicket = async (req, res) => {
  try {
    await TicketService.deleteTicket(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Ticket supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur lors de la suppression du ticket:', error);
    
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la suppression du ticket'
    });
  }
};


exports.getTicketStats = async (req, res) => {
  try {
    const stats = await TicketService.getTicketStats();
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des statistiques'
    });
  }
};