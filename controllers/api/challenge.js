const router = require('express').Router();
const { Challenge } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/addchallenge', withAuth, async (res, req) => {
  try {
    const challengeData = await Challenge.create({
      content: res.body.content,
      badge: res.body.badge,
      user_id: res.session.user_id
    })
  } catch (err) {res.status(500).json(err)}
})













module.exports = router;
