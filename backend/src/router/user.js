'use strict'
const passport = require('passport')
var express = require('express');
import {
  isAuthenticated,
  getUserInformation,
  getUserProduct
}
from '../api/user/user';


const UserRouter = () => {
  var router = express.Router();
  router.get('/products/:userid', getUserProduct)
  router.get('/info',
    isAuthenticated,
    getUserInformation);
  return router
}
module.exports = UserRouter;