var express = require('express');
var router = express.Router();

router.post('/search', function (req, res) {
  console.log('HERE', req)
  res.send('!');
});

module.exports = router;