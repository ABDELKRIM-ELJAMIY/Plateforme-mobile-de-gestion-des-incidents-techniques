const ticketService = require('../services/ticketService.js');

const create = async (req, res, next) => {
  try {
     const ticket = await ticketService.createTicket({ ...req.body, auteur: req.user.id });
    res.status(201).json(ticket);
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const tickets = await ticketService.getTickets();
    res.json(tickets);
  } catch (error) {
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket non trouvé' });
    }
    res.json(ticket);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const ticket = await ticketService.updateTicket(req.params.id, req.body);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket non trouvé' });
    }
    res.json(ticket);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const ticket = await ticketService.getTicketById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket non trouvé' });
    }
    await ticketService.deleteTicket(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  list,
  get,
  update,
  remove
};
