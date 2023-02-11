const router = require('express').Router();
const { Budget } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/add', withAuth, async (req, res) => {
  try {
    const budget = new Budget({
      user_id: req.session.user_id,
      amount: req.body.amount
    });
    await budget.save();
    res.status(200).json({ budget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
