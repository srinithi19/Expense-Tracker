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

router.post("/add", withAuth, async (req, res) => {
  try {
    const existingBudget = await Budget.findOne({
      where: {
        user_id: req.session.user_id
      }
    });

    if (existingBudget) {
      res.status(400).json({ message: "Budget already exists" });
      return;
    }

    const newBudget = await Budget.create({
      user_id: req.session.user_id,
      amount: req.body.amount
    });

    res.status(200).json({ newBudget });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
