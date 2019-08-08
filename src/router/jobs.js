'use strict'

var express = require('express');
const kue = require("kue");
import {
  scrapCategory
}
from '../controllers/jobs';

const JobsRouter = () => {
  var router = express.Router();
  router.use('/', kue.app);
  router.post('/category/new', scrapCategory);
  return router
}
module.exports = JobsRouter;