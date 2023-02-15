const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Transaction, Budget, Challenge, Quest } = require('../models');

async function renderAvatar(userId) {
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

  // if (starCounter <= 4) {
  //   const avatar = null;
  //   return avatar;
  // }
  // if (starCounter >= 5) {
  //   const avatarData = await Quest.findOne({
  //     where: {
  //       id: 1
  //     }
  //   })
  //   const avatar = avatarData.get({ plain: true })
  //   return avatar;
  // }
  // if (starCounter >= 10) {
  //   const avatarData = await Quest.findOne({
  //     where: {
  //       id: 2
  //     }
  //   })
  //   const avatar = avatarData.get({ plain: true })
  //   return avatar;
  // }

  // if (starCounter >= 15) {
  //   const avatarData = await Quest.findOne({
  //     where: {
  //       id: 3
  //     }
  //   })
  //   const avatar = avatarData.get({ plain: true })
  //   return avatar;
  // }

  // if (starCounter >= 25) {
  //   const avatarData = await Quest.findOne({
  //     where: {
  //       id: 4
  //     }
  //   })
  //   const avatar = avatarData.get({ plain: true })
  //   return avatar;
  // }
  // if (starCounter >= 30) {
  //   const avatarData = await Quest.findOne({
  //     where: {
  //       id: 5
  //     }
  //   })
  //   const avatar = avatarData.get({ plain: true })
  //   return avatar;
  // }
  if (starCounter <= 4) {
    const avatar = null;
    return avatar;
  }
  
  const questData = [
    { id: 1, min: 5, max: 9 },
    { id: 2, min: 10, max: 14 },
    { id: 3, min: 15, max: 24 },
    { id: 4, min: 25, max: 29 },
    { id: 5, min: 30 }
  ];
  
  const avatarData = questData.find(({ min, max }) => {
    return (starCounter >= min) && (!max || starCounter <= max);
  });
  
  if (avatarData) {
    const avatar = await Quest.findOne({
      where: {
        id: avatarData.id
      }
    });
    return avatar.get({ plain: true });
  }
}


router.get('/', async (req, res) => {
  let avatar;
  if (req.session.user_id) {
    avatar = await renderAvatar(req.session.user_id);
  }

  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    avatar: avatar ? avatar.url : '/images/mini.png'
  });

});

//check to see if user is loggedin or else display login/signup form
router.get('/login', async (req, res) => {
  let avatar;
  if (req.session.user_id) {
    avatar = await renderAvatar(req.session.user_id);
  }

  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login', {
    avatar: avatar ? avatar.url : '/images/mini.png'
  });
});

router.get('/signup', async (req, res) => {
  let avatar;
  if (req.session.user_id) {
    avatar = await renderAvatar(req.session.user_id);
  }

  res.render('signup', {
    avatar: avatar ? avatar.url : '/images/mini.png'
  });
});


//HTML page to render users transactions
router.get('/profile', withAuth, async (req, res) => {
  let avatar;
  if (req.session.user_id) {
    avatar = await renderAvatar(req.session.user_id);
  }
  
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
      sumExpense: sumExpense,
      avatar: avatar ? avatar.url : '/images/mini.png'
    });
  } catch (err) {
    res.status(500).json(err)
  }
});

// api to display the challenge page
router.get('/challenges', withAuth, async (req, res) => {
  let avatar;
  if (req.session.user_id) {
    avatar = await renderAvatar(req.session.user_id);
  }
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

    res.render('challenge', {
      loggedIn: req.session.loggedIn,
      challenges,
      starCounter,
      avatar: avatar ? avatar.url : '/images/mini.png'
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving challenges'
    });
  }
});


module.exports = router;

