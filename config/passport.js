const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const jwt = require("jsonwebtoken");
const ExtractJwt = require("passport-jwt").ExtractJwt;

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

const User = require("../model/userModel");
const userModel = require("../model/userModel");

require("dotenv").config();
const secretOrKey = process.env.secretOrKey;

//JWT Strategy
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload._id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);

//GOOGLE Strategy
module.exports = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.google_ID_client,
      clientSecret: process.env.google_Client_Secret,
      callbackURL:
        "https://agile-retreat-64885.herokuapp.com/users/google/redirect"
    },
    async function(accessToken, refreshToken, profile, done) {
      let payload = {};
      let user = await userModel.findOne({ email: profile.emails[0].value });
      if (user) {
        // User exists
        payload = {
          _id: user._id,
          username: user.username,
          picture: user.picture
        };
      } else {
        console.log("NOT EXISTS", profile);
        const newUser = new userModel({
          username: profile.name.givenName,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
          pw: null
        });
        let nuovoUtente = await newUser.save();
        console.log("GOOGLE AGGIUNTO", nuovoUtente);
        payload = {
          _id: nuovoUtente._id,
          username: nuovoUtente.username,
          picture: nuovoUtente.picture
        };
      }
      const options = { expiresIn: 604800 };
      const token = jwt.sign(payload, secretOrKey, options);
      done(null, token);
    }
  )
);

//GITHUB Strategy
module.exports = passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.github_ID_client,
      clientSecret: process.env.github_Client_Secret,
      callbackURL:
        "https://agile-retreat-64885.herokuapp.com/users/github/redirect"
    },
    async function(accessToken, refreshToken, profile, done) {
      let payload = {};
      let user = await userModel.findOne({ email: profile.emails[0].value });
      if (user) {
        // User exists
        payload = {
          _id: user._id,
          username: user.username,
          picture: user.picture
        };
      } else {
        console.log("NOT EXISTS", profile);
        const newUser = new userModel({
          username: profile.username,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
          pw: null
        });
        let nuovoUtente = await newUser.save();
        console.log("GITHUB AGGIUNTO", nuovoUtente);
        payload = {
          _id: nuovoUtente._id,
          username: nuovoUtente.username,
          picture: nuovoUtente.picture
        };
      }
      const options = { expiresIn: 604800 };
      const token = jwt.sign(payload, secretOrKey, options);
      done(null, token);
    }
  )
);
