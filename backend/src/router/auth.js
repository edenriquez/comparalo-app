'use strict'
var express = require('express');
const passport = require('passport');
import {
  createUser
} from '../api/auth/auth';
import {
  CONSTANTS
} from '../config/constants'

const AuthRouter = () => {
  var router = express.Router();
  router.post('/new', createUser);

  router.get('/facebook',
    passport.authenticate('facebook', {
      scope: ['email']
    }));

  router.get('/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    }));

  router.get('/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: CONSTANTS.FRONTEND_BASE_API + '/#/auth/facebook/success',
      failureRedirect: CONSTANTS.FRONTEND_BASE_API + '/#/auth/facebook/failure',
    }));

  router.get('/google/callback',
    passport.authenticate('google', {
      successRedirect: CONSTANTS.FRONTEND_BASE_API + '/#/auth/google/success',
      failureRedirect: CONSTANTS.FRONTEND_BASE_API + '/#/auth/google/failure',
    }));

    router.get('/google/logout', (req, res)=>{
      req.logout();
      res.redirect('/');
    });
    
  return router
}
module.exports = AuthRouter;