const router = require('express').Router();
const userRoutes = require('./userRoutes');
const transRoutes = require('./transactionRoutes');
const budgetRoutes = require('./budgetRoutes');

router.use('/users', userRoutes);
router.use('/transaction', transRoutes);
router.use('/budget', budgetRoutes);

module.exports = router;