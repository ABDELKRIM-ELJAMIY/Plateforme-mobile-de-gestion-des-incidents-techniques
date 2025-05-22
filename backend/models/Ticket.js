
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  titre: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  description: {
    type: String,
    required: [true, 'La description est obligatoire'],
    trim: true
  },
  statut: {
    type: String,
    enum: ['nouveau', 'en_cours', 'en_attente', 'résolu', 'fermé'],
    default: 'nouveau'
  },
  assigné: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  auteur: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'L\'auteur est obligatoire']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Ticket', TicketSchema);