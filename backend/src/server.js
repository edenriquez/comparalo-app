require('dotenv').config();
process.env["NODE_CONFIG_DIR"] = __dirname + "/config/";
const all_routes = require('express-list-endpoints');
const config = require('config');
var express = require('express'),
  cookieParser = require('cookie-parser'),
  session = require('express-session');
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

app.use(cookieParser());
app.use(session({
  secret: 'somesecure',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: (4 * 60 * 60 * 1000)
  }, // 4 hours
}));

app.use(passport.initialize());
app.use(passport.session());

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
      return done(null, response)
    }
  }
));

passport.serializeUser(function (user, done) {
  console.log('SERIALIZE ', user);
  done(null, user.email);
});

passport.deserializeUser(async function (email, done) {
  console.log('DESERIALIZE ', email);
  const user = await models.Users.findUser(email)
  console.log('USER ', user);

  done(null, user);
});


passport.use(new GoogleStrategy(
  config.googleAuth,
  async (accessToken, refreshToken, profile, done) => {
    const data = buildUserObject(profile._json)
    const entity = new models.Users(data)
    entity.status = USER_STATUSES.ACTIVE
    const response = await entity.save()
    if (response.id) {
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

// TODO: validate if prod and activate cors midd
// enabling CORS for all requests
// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:4200'
// }));
// https://github.com/axios/axios/issues/587#issuecomment-453275703
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  next();
});

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use('/', require('./router')())

// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
connectDb().then(async () => {
  console.log(all_routes(app));
  app.listen(process.env.PORT);
});