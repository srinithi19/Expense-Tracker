const router = require('express').Router();
const { Budget } = require('../../models');
const withAuth = require('../../utils/auth');

router.put("/update", withAuth, async (req, res) => {
  try {
    const budgetData = await Budget.update({ amount: req.body.amount }, {
      where: {
        user_id: req.session.user_id
      }
    });

    if (!budgetData) {
      res.status(404).json({ message: "Budget not found" });
      return;
    }

    res.status(200).json({ budgetData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
