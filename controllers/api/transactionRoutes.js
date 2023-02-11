const router = require('express').Router();
const sequelize = require('../../config/connection');
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




// attempted to put the above two together but they don't work
  router.get('/', withAuth, async (req, res) => {
    console.log(req.session)
    console.log(req.session.user_id)
  try {
    const transactionData = await Transaction.findAll({
      where: { user_id: req.session.user_id },
    }); 
    const budgetData = await Budget.findOne({
              where: { user_id: req.session.user_id },
            });

 
//     const expenseData = await Transaction.findAll({
//       attributes: [
//         [sequelize.fn('sum', sequelize.col('amount')), 'total'],
//       ]
//     }); 
//     const expense = expenseData.map((exp) => exp.get({ plain: true }));

   let transactions = {}

    if (transactionData) {
    transactions = transactionData.map((trans) => trans.get({ plain: true }));
          }

    let budget = {}
    if (!budgetData) {
      budget.amount = 0
    } else{
      budget = budgetData.get({ plain: true })
    }
 

  var sumIncome = 0;
   var sumExpense = 0;
  transactions.forEach(transaction => {
   if (transaction.category === 'income') {

    sumIncome += transaction.amount
  } else if (transaction.category === 'expense') {

    sumExpense += transaction.amount
  }
  })
    res.render('profile', {
      transactions,
      date: req.body.date,
      category: req.body.category,
      subcategory: req.body.subCategory,
      description: req.body.description,
      amount: req.body.amount,
      budget,
      sumIncome,
      sumExpense
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err)}
});

//   router.get('/', withAuth, async (req, res) => {
//     console.log(req.session)
//   try {
//     const expenseData = await Transaction.findAll({
//       attributes: [
//         [sequelize.fn('sum', sequelize.col('amount')), 'total'],
//       ]
//     }); 
//     const expense = expenseData.map((exp) => exp.get({ plain: true }));

//     console.log(expense)
//     res.render('profile', {
//       expense,
//     });
//   } catch (err) {res.status(500).json(err)}
// }); // closest it adds all the transactions though not just that user but doesnt render a number renders an object literal 





// router.get('/', withAuth, async (req, res) => {
//       console.log(req.session)
//     try {
//       const transactionData = await Transaction.findAll({
//         where: { user_id: req.session.user_id },
//       }); 
//        // attempted to add a nested try block but that didnt seem to work
//       const transactions = transactionData.map((trans) => trans.get({ plain: true }));


//       res.render('profile', {
//         expense,
//    ,
//       });
//     } catch (err) {res.status(500).json(err)}
//   });

module.exports = router;

