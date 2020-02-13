'use strict'
var passport = require('passport');
var express = require('express');

const AuthRouter = () => {
  var router = express.Router();
  router.get('/facebook', passport.authenticate('facebook'));
  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      display: 'popup',
      scope: 'read_stream',
      successRedirect: '/',
      failureRedirect: '/login'
    }));
  return router
}
module.exports = AuthRouter;