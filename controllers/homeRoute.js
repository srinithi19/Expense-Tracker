const router = require('express').Router();
//const { User,Transaction,Budget } = require('../models');
const withAuth = require('../utils/auth');


//Rrender application homepage
router.get('/', async (req, res) => {
    console.log("-------------------")
    console.log("USER1" + req.session.username);
    console.log("-------------------")

    res.render('homepage', {
        loggedIn: req.session.loggedIn,
        user: req.session.user_id,
        name: req.session.name,
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

module.exports = router;

