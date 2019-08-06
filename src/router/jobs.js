'use strict'

var express = require('express');

import {
  getAllJobs,
  createJob,
} from '../controllers/jobs';

const JobsRouter = () => {
  var router = express.Router();
  router.get('/', getAllJobs);
  router.post('/new', createJob);
  return router
}
module.exports = JobsRouter;