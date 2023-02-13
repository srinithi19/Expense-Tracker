const router = require("express").Router();
const { Challenge, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/addChallenge", withAuth, async (req, res) => {
  console.log('hitting /addChallenge')
  console.log(req.body)
  console.log(req.session)

  try {
    const challengeData = await Challenge.create({
      content: req.body.content,
      badge : "false",
      user_id: req.session.user_id,
    });
    //console.log(res)
    res.status(200).json({challengeData});

  } catch (err) {
    //console.log(err)
    console.log("HERE:======="+response.statusText)
    res.status(500).json(err);
  }
});

router.put("/update/:id", withAuth, async (req, res) => {
  console.log('hitting update Challenge')
  console.log(req.body)
  console.log(req.params.id)
  console.log(req.session)

  try {
    const challengeData = await Challenge.update({
      badge: req.body.badge }, 
      {
        where : {
          id: req.params.id,
        }
      })

    //console.log(res)
    res.status(200).json({challengeData});

  } catch (err) {
    console.log("==========ERROR=========")
    console.log(err)
    res.status(500).json(err);
  }
});



module.exports = router;
