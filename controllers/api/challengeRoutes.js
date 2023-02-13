const router = require("express").Router();
const { Challenge } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/addChallenge", withAuth, async (req, res) => {
  console.log('hitting /addChallenge')
  console.log(req.body)
  console.log(req.session)

  try {
    const challengeData = await Challenge.create({
      content: req.body.content,
      badge: req.body.badge,
      user_id: req.session.user_id,
    });
    console.log(res)
    res.status(200).json({challengeData});

  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});



module.exports = router;
