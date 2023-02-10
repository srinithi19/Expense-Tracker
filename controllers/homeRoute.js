const router = require('express').Router();
const { User,Transaction,Budget } = require('../models');
const withAuth = require('../utils/auth');

//check to see if user is loggedin or else display login/signup form
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

module.exports = router;

