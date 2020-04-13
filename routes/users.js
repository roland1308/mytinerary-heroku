const express = require("express");
const router = express.Router();
const userModel = require("../model/userModel");

require("dotenv").config();
const secretOrKey = process.env.secretOrKey;

const sharp = require('sharp')
const path = require('path')

const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());

const jwt = require("jsonwebtoken");
const passport = require("passport");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const now = new Date().toISOString();
    //windows needs to replace ":" for "-" to save the picture correctly
    const date = now.replace(/:/g, "-");
    cb(null, date + file.originalname);
  }
});
const upload = multer({ storage: storage });

const momstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "mom" + file.originalname);
  }
});
const uploadmom = multer({ storage: momstorage });

/*get all users TO BE COMMENTED OUT IN PRODUCTION*/
router.get("/all", (req, res) => {
  userModel
    .find({})
    .then(files => {
      res.send(files);
    })
    .catch(err => console.log(err));
});

/*add a User if not existing already: CREATE*/
router.post("/add", [upload.single("picture")], async (req, res) => {
  const { filename: image } = req.file
  await sharp(req.file.path)
    .resize(500)
    .jpeg({ quality: 50 })
    .toFile(
      path.resolve(req.file.destination, 'resized', image)
    )
  fs.unlinkSync(req.file.path)
  const { username, email, pw } = req.body;
  if (!username || !email || !pw) {
    return res.status(400).json({ msg: "Please fill all fields" });
  }
  bcrypt.hash(pw, saltRounds).then(function (hash) {
    // Store hash in your password DB.
    const newUser = new userModel({
      username,
      email,
      picture: "/uploads/resized/" + req.file.filename,
      pw: hash,
      favorites: []
    });
    newUser
      .save()
      .then(user => {
        res.send(user);
      })
      .catch(err => {
        //Delete uploaded avatar
        unlinkAsync(req.file.path);
        res.send(err);
      });
  });
});

/*add PICTURE for preview when creating user*/
// router.post("/addmom", [uploadmom.single("picture")], (req, res) => {
//   res.send("ok");
// });

/*remove ALL MOM PICTURES when leaving createAccount Component*/
// router.delete("/removemom", (req, res) => {
//   const path = "./uploads/";
//   let regex = /^mom/;
//   fs.readdirSync(path)
//     .filter(f => regex.test(f))
//     .map(f => fs.unlinkSync(path + f));
//   res.send("ok");
// });

// Login user
router.post("/login", (req, res) => {
  userModel
    .findOne({
      username: req.body.username
    })
    .then(user => {
      // provide error if user does not correspond with email of one user in the database
      if (!user) {
        console.log("Nome utente non trovato");
        res.send("UTENTE INESISTENTE");
      } else {
        // compare passwords with bycript compare function
        bcrypt.compare(req.body.pw, user.pw, function (err, result) {
          if (!result) {
            console.log("PW ERRATA", err);
            res.send("PW ERRATA");
          } else {
            // create JWT payload, sign token and send it back
            res.send(user);
          }
        });
      }
    });
});

// PUSH favorite inside favorites
router.put(
  "/pushfavorite",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel.findByIdAndUpdate(
      req.user.id,
      { $push: { favorites: req.body.itinerary_id } },
      { safe: true, upsert: true },
      function (err, doc) {
        if (err) {
          res.send(err);
        } else {
          res.send("OK");
        }
      }
    )
      .populate("favorites", "name city rating duration price");
  }
);

// PULL favorite from favorites
router.put(
  "/pullfavorite",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel.findByIdAndUpdate(
      req.user.id,
      { $pull: { favorites: req.body.itinerary_id } },
      { safe: true, upsert: true },
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

// LIST favorites for a user and populate
router.get(
  "/listfavorite",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .findById({ _id: req.user.id }, { favorites: 1, _id: 0 })
      .populate("favorites", "name city rating duration price")
      .then(favorites => {
        res.send(favorites);
      })
      .catch(err => console.log(err));
  }
);

// JWT Authentication
router.get(
  "/aut",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    userModel
      .findOne({ _id: req.user.id })
      .then(user => {
        res.json(user);
      })
      .catch(err => res.status(404).json({ error: "User does not exist!" }));
  }
);

// JWT TOKEN Translation
router.get(
  "/check",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

//GOOGLE Authentication
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    // failureRedirect: "http://localhost:3000/createaccount",
    failureRedirect: "https://agile-retreat-64885.herokuapp.com/createaccount",
    session: false
  }),
  function (req, res) {
    // res.redirect("http://localhost:3000/storetoken/?token=" + req.user);
    // res.redirect(`/storetoken/?token=${req.user}`);
    res.redirect(
      "https://agile-retreat-64885.herokuapp.com/storetoken/?token=" + req.user
    );
  }
);

//GITHUB Authentication
router.get("/github", passport.authenticate("github"));

router.get(
  "/github/redirect",
  passport.authenticate("github", {
    failureRedirect: "https://agile-retreat-64885.herokuapp.com/createaccount",
    session: false
  }),
  function (req, res) {
    res.redirect(
      "https://agile-retreat-64885.herokuapp.com/storetoken/?token=" + req.user
    );
  }
);

//Create TOKEN
router.post("/token", (req, res) => {
  const payload = {
    _id: req.body._id,
    username: req.body.username,
    picture: req.body.picture
  };
  const options = { expiresIn: 604800 };
  const token = jwt.sign(payload, secretOrKey, options);
  res.send(token);
});

module.exports = router;
