const express = require("express");
const router = express.Router();
const cityModel = require("../model/cityModel");

// get first 12 popular itineraries (City at the moment)
router.get("/carousel", (req, res) => {
  cityModel
    .find({}, null, { limit: 12, sort: { name: 1 } })
    .then(files => {
      res.send(files);
    })
    .catch(err => console.log(err));
});

/*get all cities*/
router.get("/all", (req, res) => {
  cityModel
    .find({})
    .sort({ name: 1 })
    .then(files => {
      res.send(files);
    })
    .catch(err => console.log(err));
});

/*add a City if not existing already CREATE*/
router.post("/add", (req, res) => {
  cityModel.findOne({ name: req.body.name }).then(exists => {
    if (exists) {
      console.log("Cittá esistente", exists);
      res.send("ESISTE");
    } else {
      const newCity = new cityModel({
        name: req.body.name,
        country: req.body.country,
        url: req.body.url
      });
      console.log("Cittá aggiunta");
      newCity
        .save()
        .then(city => {
          res.send(city);
        })
        .catch(err => {
          console.log("ERRORE CITTÀ ESISTENTE");
          res.status(500).send(err);
        });
    }
  });
});

/*get one city by id READ*/
router.get("/:id", (req, res) => {
  cityModel
    .findOne({ _id: req.params.id })
    .then(files => {
      res.send(files);
    })
    .catch(err => console.log(err));
});

/*update one city's name UPDATE*/
router.put("/:name/:newname", (req, res) => {
  cityModel
    .findOneAndUpdate(
      { name: req.params.name },
      {
        $set: {
          name: req.params.newname
        }
      },
      {
        new: true
      }
    )
    .then(old => {
      if (old !== null) {
        res.json(old);
        console.log("Città aggiornata");
      } else {
        console.log("ERRORE AGGIORNAMENTO");
        res.json(old);
      }
    });
});

/*delete one city DELETE*/
router.delete("/:name", (req, res) => {
  cityModel.findOneAndDelete({ name: req.params.name }).then(result => {
    if (result) {
      console.log("Successful deletion");
      res.send(result);
    } else {
      console.log("NON TROVATA");
      res.send(result);
    }
  });
});

module.exports = router;
