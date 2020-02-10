require('dotenv').config();
var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const constants = require('./config/constants');
var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;
import models, {
  connectDb,
} from './models';

passport.use(new FacebookStrategy(
  constants.FacebookConfig, async (accessToken, refreshToken, profile, done) => {
    const result = await models.User.findUSer(profile.emails[0])
    if (!result) {
      done(result)
    }
    done(null, result)
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

app.use('/', require('./router')())

connectDb().then(async () => {
  app.listen(process.env.PORT);
});