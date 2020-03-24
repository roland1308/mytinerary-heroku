const express = require("express");
const router = express.Router();
const itineraryModel = require("../model/itineraryModel");
const mongoose = require("mongoose");
const passport = require("passport");

mongoose.set("useFindAndModify", false);

/*get all itineraries READ*/
router.get("/all", (req, res) => {
  itineraryModel
    .find({})
    .then(files => {
      res.send(files);
    })
    .catch(err => console.log(err));
});

/*add an Itinerary CREATE* STILL NOT IN PRODUCTION */
router.post("/add", (req, res) => {
  const newItinerary = new itineraryModel({
    name: req.body.name,
    city: req.body.city,
    city_id: req.body.city_id,
    country: req.body.country,
    username: req.body.username,
    photo: req.body.photo,
    rating: req.body.rating,
    duration: req.body.duration,
    price: req.body.price,
    hashtags: req.body.hashtags
  });
  console.log("Itinerario ricevuto", req.body);
  newItinerary
    .save()
    .then(itinerary => {
      res.send(itinerary);
    })
    .catch(err => {
      console.log("ERRORE ITINERARIO");
      res.status(500).send(err);
    });
});

/*get Itineraries for a city by City's ID and POPULATE comments READ*/
router.get("/:id", (req, res) => {
  itineraryModel
    .find({ city_id: req.params.id })
    .populate("comments", "username picture usercomment")
    .then(files => {
      res.send(files);
    })
    .catch(err => console.log(err));
});

/*get one itinerary by id and POPULATE activities READ*/
router.get("/populate/:id", (req, res) => {
  itineraryModel
    .findOne({ _id: req.params.id })
    .populate("activities", "name address photo time cost comments")
    .exec(function (err, itinerary) {
      if (err) {
        console.log("errore", err);
        return;
      }
      res.send(itinerary);
      return;
    });
});

/*update one itinerary's name and photo by ID UPDATE* STILL NOT IN PRODUCTION*/
router.put("/:id/:newname/:newphoto", (req, res) => {
  itineraryModel
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          name: req.params.newname,
          photo: req.params.newphoto
        }
      },
      {
        new: true
      }
    )
    .then(old => {
      if (old !== null) {
        res.json(old);
        console.log("Itinerario aggiornata");
      } else {
        console.log("ERRORE AGGIORNAMENTO");
        res.json(old);
      }
    });
});

// find one itinerary by id and update and push comment in array
router.put("/addcommentid", (req, res) => {
  itineraryModel.findByIdAndUpdate(
    req.body.itinerary_id,
    { $push: { comments: req.body.commentId } },
    { safe: true, upsert: true },
    function (err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.send("OK");
      }
    }
  );
});

// find one itinerary by id and update and pull comment in array
router.put(
  "/pullcommentid",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    itineraryModel.findByIdAndUpdate(
      req.body.itinerary_id,
      { $pull: { comments: req.body.comment_Id } },
      { safe: true, upsert: true },
      function (err, doc) {
        if (err) {
          res.send(err);
        } else {
          res.send("OK");
        }
      }
    );
  });

/*delete one itinerary by ID DELETE* STILL NOT IN PRODUCTION*/
router.delete("/:id", (req, res) => {
  itineraryModel.findOneAndDelete({ _id: req.params.id }).then(result => {
    if (result) {
      console.log("Successful deletion");
      res.send(result);
    } else {
      console.log("NON TROVATO");
      res.send(result);
    }
  });
});

module.exports = router;
