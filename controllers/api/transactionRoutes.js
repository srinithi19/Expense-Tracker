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



  router.get('/', withAuth, async (req, res) => {
    console.log('hitting')
    console.log(req.session.user_id)
  try {
    const transactionData = await Transaction.findAll({
      where: { user_id: req.session.user_id },
    });
    const transactions = transactionData.map((trans) => trans.get({ plain: true }));
    console.log(transactions)

    res.render('profile', {
      transactions,
      date: req.body.date,
      category: req.body.category,
      subcategory: req.body.subCategory,
      description: req.body.description,
      amount: req.body.amount,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

