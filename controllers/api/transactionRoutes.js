const router = require('express').Router();
const sequelize = require('../../config/connection');
const { User,Transaction,Budget } = require('../../models');
const withAuth = require('../../utils/auth');


//create a new transaction income/expense
router.post('/addTransaction', withAuth, async (req, res) => {
    try {
      const newTransaction = await Transaction.create({
        date: req.body.date,
        category: req.body.category,
        subcategory: req.body.subCategory,
        description: req.body.desc,
        amount: req.body.amt,
        user_id: req.session.user_id,
      });
      res.status(200).json(newTransaction);
      
    } catch (err) {
      res.status(500).json('Internal Server Error');
    }
  });


module.exports = router;

