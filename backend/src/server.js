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
} from './api/utils/utils';

import {
  USER_STATUSES
} from './config/constants';

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
    const data = buildUserObject(profile._json)
    const entity = new models.Users(data)
    entity.status = USER_STATUSES.ACTIVE
    const response = await entity.save()
    if (response.id) {
      req.usedStrategy = 'facebook';
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
  async (accessToken, refreshToken, profile, done) => {
    const data = buildUserObject(profile._json)
    const entity = new models.Users(data)
    entity.status = USER_STATUSES.ACTIVE
    const response = await entity.save()
    if (response.id) {
      req.usedStrategy = 'google';
      return done(null, response)
    }
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

app.use(passport.session());

app.use('/', require('./router')())

connectDb().then(async () => {
  console.log(all_routes(app));
  app.listen(process.env.PORT);
});