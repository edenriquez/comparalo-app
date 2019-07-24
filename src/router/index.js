var express = require('express');
var router = express.Router();
import {
  db
} from '../database/db';
import {
  log
} from 'util';

router.get('/categories', function (req, res) {
  res.json(db);
});

router.get('/categories/:category', function (req, res) {
  const response = db.categories.find(i => req.params.category == i.category)
  res.json(response);
});

router.get('/categories/:category/products', function (req, res) {
  const response = db.categories.find(i => req.params.category == i.category)
  res.json(response.products);
});

router.put('/categories/:category/products/:id', function (req, res) {
  log(req.body)
  const response = db.categories.find(i => req.params.category == i.category)
  const product = response.products.filter((i) => {
    if (req.params.id == i.id) {
      i.status = req.params.status
    }
  })
  res.json(product);
});

module.exports = router;