const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');
const { auth, isAdmin, isAuthorOrAdmin } = require('../middlewares/auth.middleware');
const logger = require('../middlewares/logger.middleware');

router.use(auth);
router.use(logger);

router.get('/stats', isAdmin, ticketController.getTicketStats);


router.post('/', ticketController.createTicket);
router.get('/', ticketController.getTickets);
router.get('/:id', ticketController.getTicketById);
router.put('/:id', isAuthorOrAdmin, ticketController.updateTicket);
router.delete('/:id', isAuthorOrAdmin, ticketController.deleteTicket);

module.exports = router;