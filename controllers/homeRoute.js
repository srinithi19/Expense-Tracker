const router = require('express').Router();
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


//HTML page to render users transactions
//TODO - add withAuth

router.get('/profile', withAuth, (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('profile' , {
    loggedIn: req.session.loggedIn 
  });
});


module.exports = router;

