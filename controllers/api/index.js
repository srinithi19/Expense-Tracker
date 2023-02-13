const router = require('express').Router();
const userRoutes = require('./userRoutes');
const transRoutes = require('./transactionRoutes');
const budgetRoutes = require('./budgetRoutes');
const challengeRoutes = require('./challengeRoutes');

router.use('/users', userRoutes);
router.use('/transaction', transRoutes);
router.use('/budget', budgetRoutes);
router.use('/challenge', challengeRoutes);

module.exports = router;