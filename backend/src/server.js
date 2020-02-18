require('dotenv').config();
process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const all_routes = require('express-list-endpoints');
const config = require('config');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
import {
  buildUserObject
} from './api/utils/utils'
const passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy,
  GoogleStrategy = require('passport-google-oauth20').Strategy;
import models, {
  connectDb,
} from './models';

passport.use(new FacebookStrategy({
    ...config.facebookAuth,
    ...{
      profileFields: ["emails", "name"]
    },
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile._json)
    const data = buildUserObject(profile._json)
    const entity = new models.Users(data)
    const response = await entity.save()
    if (response.id) {
      return done(null, response)
    }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


passport.use(new GoogleStrategy(
  config.googleAuth,
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
      googleId: profile.id
    }, function (err, user) {
      return cb(err, user);
    });
  }
));

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// serve static content 
app.use('/static', express.static('public'));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use(passport.initialize());

app.use('/', require('./router')())

connectDb().then(async () => {
  console.log(all_routes(app));
  app.listen(process.env.PORT);
});