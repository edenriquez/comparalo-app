'use strict'

var express = require('express');
import {
  searchOptions
}
from '../api/search/search';


const SearchRouter = () => {
  var router = express.Router();
  router.get('/options', searchOptions);
  return router
}
module.exports = SearchRouter;