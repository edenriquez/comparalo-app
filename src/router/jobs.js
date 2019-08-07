'use strict'

var express = require('express');
const kue = require("kue");
import {
  createJob
}
from '../controllers/jobs';

const JobsRouter = () => {
  var router = express.Router();
  router.use('/', kue.app);
  router.post('/new', createJob);
  return router
}
module.exports = JobsRouter;