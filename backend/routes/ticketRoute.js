
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authenticateToken = require('../middlewares/authenticateToken');

router.post('/', authenticateToken, ticketController.create);
router.get('/', authenticateToken, ticketController.list);
router.get('/:id', authenticateToken, ticketController.get);
router.put('/:id', authenticateToken, ticketController.update);
router.delete('/:id', authenticateToken, ticketController.remove);

module.exports = router;
