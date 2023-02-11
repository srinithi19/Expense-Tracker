const router = require('express').Router();
//const { User,Transaction,Budget } = require('../models');
const withAuth = require('../utils/auth');


//Rrender application homepage
router.get('/', async (req, res) => {
    console.log("-------------------")
    console.log("USER1" + req.session.name);
    console.log("-------------------")

    res.render('homepage', {
      loggedIn: req.session.loggedIn // homepage now renders as logged in
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

// HTML page to render users transactions
router.get('/profile', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('profile');
});


module.exports = router;

