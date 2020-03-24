const express = require("express");
const router = express.Router();
const commentModel = require("../model/commentModel");

const passport = require("passport");

/*get all comments TO BE COMMENTED OUT IN PRODUCTION*/
router.get("/all", (req, res) => {
  commentModel
    .find({})
    .then(files => {
      res.send(files);
    })
    .catch(err => console.log(err));
});

/*get comment by username*/
router.get(
  "/userall/:token",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    commentModel
      .find({ username: req.user.username })
      .then(files => {
        res.send(files);
      })
      .catch(err => console.log(err));
  });

/*add a comment CREATE*/
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, picture } = req.user;
    const newcomment = new commentModel({
      username,
      picture,
      usercomment: req.body.usercomment,
      itineraryid: req.body.itineraryid
    });
    newcomment
      .save()
      .then(comment => {
        res.send(comment._id);
      })
      .catch(err => {
        res.send(err);
      });
  }
);

// PULL comment from comments
router.put(
  "/pullcomment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    commentModel.findByIdAndDelete(
      req.body.comment_id,
      function (err, doc) {
        if (err) {
          res.send(err);
        } else {
          res.send("OK");
        }
      }
    );
  }
);

module.exports = router;
