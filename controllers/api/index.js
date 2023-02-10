const router = require('express').Router();
const userRoutes = require('./userRoutes');
const transRoutes = require('./transactionRoutes');

router.use('/users', userRoutes);
router.use('/transaction', transRoutes);

module.exports = router;