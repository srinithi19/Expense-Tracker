const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Transaction, Budget, Challenge, Quest } = require('../models');

async function renderAvatar(userId) {
  console.log(userId)
  const challengesData = await Challenge.findAll({
    where: {
      user_id: userId
    }
  });

  let challenges = {};
  if (challengesData) {
    challenges = challengesData.map((challenge) => challenge.get({ plain: true }));
    challenges = challenges.reverse()
  }

  let starCounter = 0;
  for (const input of challenges) {
    if (input.badge === true) starCounter += 1;
  }
  console.log(starCounter)

  if (starCounter <= 4) {
    const avatarData = await Quest.findOne({
      where: {
        id: 1
      }
    })
    const avatar = avatarData.get({ plain: true })
    return avatar;
  }

  if (starCounter <= 5 || starCounter >= 9) {
    const avatar = await Quest.findOne({
      where: {
        id: 2
      }
    })
    return avatar;
  }

  if (starCounter <= 10 || starCounter >= 14) {
    const avatar = await Quest.findOne({
      where: {
        id: 3
      }
    })
    return avatar;
  }

  if (starCounter >= 15) {
    const avatar = await Quest.findOne({
      where: {
        id: 4
      }
    })
    return avatar;
  }
}


//Rrender application homepage
router.get('/', async (req, res) => {

  if (req.session.user_id) {
    var avatar = renderAvatar(req.session.user_id)
  }

  res.render('homepage', {
    loggedIn: req.session.loggedIn, // homepage now renders as logged in
    avatar: avatar.url
  });
});

//check to see if user is loggedin or else display login/signup form
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});


//HTML page to render users transactions
router.get('/profile', withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
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
    } else {
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
      loggedIn: req.session.loggedIn,
      transactions,
      date: req.body.date,
      category: req.body.category,
      subcategory: req.body.subCategory,
      description: req.body.description,
      amount: req.body.amount,
      budget: budget,
      sumIncome: sumIncome,
      sumExpense: sumExpense
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

// api to display the challenge page
router.get('/challenges', withAuth, async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  try {
    const challengesData = await Challenge.findAll({
      where: {
        user_id: req.session.user_id
      }
    });
    let challenges = {};
    if (challengesData) {
      challenges = challengesData.map((challenge) => challenge.get({ plain: true }));
      challenges = challenges.reverse()
    }
    let starCounter = 0;
    for (const input of challenges) {
      if (input.badge === true) starCounter += 1;
    }

    // gets quest to render for challenges page
    let questData = await Quest.findAll()

    const quests = questData.map((quest) => quest.get({ plain: true }))

    res.render('challenge', {
      loggedIn: req.session.loggedIn,
      challenges,
      starCounter,
      quests
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving challenges'
    });
  }
});


module.exports = router;

