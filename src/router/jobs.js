'use strict'

var express = require('express');
const kue = require("kue");

const JobsRouter = () => {
  var router = express.Router();
  router.use('/', kue.app);
  return router
}
module.exports = JobsRouter;