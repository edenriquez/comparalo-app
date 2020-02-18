'use strict'
var express = require('express');
const passport = require('passport');
import {
  CONSTANTS
} from '../config/constants'
const AuthRouter = () => {
  var router = express.Router();
  router.get('/facebook', passport.authenticate('facebook', {
    scope: ['email']
  }));

  router.get('/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: CONSTANTS.FRONTEND_BASE_API + '/#/auth/facebook/success',
      failureRedirect: CONSTANTS.FRONTEND_BASE_API + '/#/auth/facebook/failure',
    }));

  return router
}
module.exports = AuthRouter;