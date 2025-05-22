const Ticket = require('../models/Ticket');

class TicketService {
  
  async createTicket(ticketData) {
    try {
      const ticket = new Ticket(ticketData);
      await ticket.save();
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async getTickets(filter = {}) {
    try {
      return await Ticket.find(filter)
        .populate('auteur', 'nom email')
        .populate('assigné', 'nom email')
        .sort({ createdAt: -1 });
    } catch (error) {
      throw error;
    }
  }

  async getTicketById(id) {
    try {
      const ticket = await Ticket.findById(id)
        .populate('auteur', 'nom email')
        .populate('assigné', 'nom email');
      
      if (!ticket) {
        const error = new Error('Ticket non trouvé');
        error.statusCode = 404;
        throw error;
      }
      
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  
  async updateTicket(id, updateData) {
    try {
      const ticket = await Ticket.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: Date.now() },
        { new: true, runValidators: true }
      ).populate('auteur', 'nom email')
       .populate('assigné', 'nom email');
      
      if (!ticket) {
        const error = new Error('Ticket non trouvé');
        error.statusCode = 404;
        throw error;
      }
      
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async deleteTicket(id) {
    try {
      const ticket = await Ticket.findByIdAndDelete(id);
      
      if (!ticket) {
        const error = new Error('Ticket non trouvé');
        error.statusCode = 404;
        throw error;
      }
      
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getTicketStats() {
    try {
      const statsByStatus = await Ticket.aggregate([
        { $group: { _id: '$statut', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      const statsByUser = await Ticket.aggregate([
        { $group: { _id: '$auteur', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]);

      const populatedUserStats = await Ticket.populate(statsByUser, {
        path: '_id',
        select: 'nom email',
        model: 'User'
      });

      return {
        total: await Ticket.countDocuments(),
        parStatut: statsByStatus,
        parUtilisateur: populatedUserStats
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TicketService();