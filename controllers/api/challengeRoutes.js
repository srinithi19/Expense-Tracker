const router = require("express").Router();
const { Challenge, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/addChallenge", withAuth, async (req, res) => {

  try {
    const challengeData = await Challenge.create({
      content: req.body.content,
      badge : "false",
      user_id: req.session.user_id,
    });
    res.status(200).json({challengeData});

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update/:id", withAuth, async (req, res) => {


  try {
    const challengeData = await Challenge.update({
      badge: req.body.badge }, 
      {
        where : {
          id: req.params.id,
        }
      })

    res.status(200).json({challengeData});

  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
