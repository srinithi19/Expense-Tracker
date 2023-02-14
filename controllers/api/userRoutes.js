const router = require('express').Router();
const { User } = require('../../models');

// Create new user
router.post('/signUp', async (req, res) => {
   try {
      const userData = await User.create({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
      });
      const data = userData.get({ plain: true });
      req.session.save(() => {
         req.session.user_id = data.id;
         req.session.username = data.name;
         req.session.loggedIn = true;

         res.status(200).json(userData);
      });
   } catch (err) {
      console.log(err);
      res.status(500).json(err);
   }
});

// Login
router.post('/login', async (req, res) => {
   try {
      const userData = await User.findOne({
         where: {
            email: req.body.email,
         },
      });

      if (!userData) {
         res
            .status(400)
            .json({ message: 'Incorrect email or password. Please try again!' });
         return;
      }
      const data = userData.get({ plain: true });
      const validPassword = await userData.checkPassword(req.body.password);

      if (!validPassword) {
         res
            .status(400)
            .json({ message: 'Incorrect email or password. Please try again!' });
         return;
      }

      req.session.save(() => {
         req.session.loggedIn = true;
         req.session.username = data.name;
         req.session.user_id = data.id;

         res
            .status(200)
            .json({ user: userData, message: 'You are now logged in!' });
      });
   } catch (err) {
      res.status(500).json(err);
   }
});

router.post('/logout', (req, res) => {
   if (req.session.loggedIn) {
      req.session.destroy(() => {
         res.status(204).end();
      });
   } else {
      res.status(404).end();
   }
});

module.exports = router;
