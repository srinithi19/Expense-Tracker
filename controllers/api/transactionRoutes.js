const router = require('express').Router();
const { User,Transaction,Budget } = require('../../models');
const withAuth = require('../../utils/auth');


//create a new transaction income/expense
router.post('/addTransaction', async (req, res) => {
    console.log("-----IN transaction api-----")
    console.log(req.body.comment + "----------")
    console.log(req.body.user + "---------")
    try {
      const newTransaction = await Transaction.create({
        date: req.body.comment,
        category: req.body.category,
        subCategory: req.body.subCategory,
        description: req.body.desc,
        amt: req.body.amt,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newTransaction);
    } catch (err) {
      res.status(500).json('Internal Server Error');
    }
  });

module.exports = router;

