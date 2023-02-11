const router = require('express').Router();
const { User,Transaction,Budget } = require('../../models');
const withAuth = require('../../utils/auth');


//create a new transaction income/expense
router.post('/addTransaction', withAuth, async (req, res) => {
    console.log("-----IN transaction api-----")
    console.log(req.body.date + "----------")
    console.log(req.body.category + "----------")
    console.log(req.body.subCategory + "----------")
    console.log(req.body.amt + "----------")
    console.log(req.body.user_id + "---------")
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
      console.log(err)
      res.status(500).json('Internal Server Error');
    }
  });

module.exports = router;

