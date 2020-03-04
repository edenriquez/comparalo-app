'use strict'
const passport = require('passport')
var express = require('express');
import {
  isAuthenticated,
  getUserInformation
}
from '../api/user/user';


const UserRouter = () => {
  var router = express.Router();
  router.get('/info',
    isAuthenticated,
    getUserInformation);
  return router
}
module.exports = UserRouter;