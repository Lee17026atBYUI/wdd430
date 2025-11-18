var express = require('express');
// var path = require('path');
var router = express.Router();

router.get('/hello', (req, res, next) => {
  res.send('hello');
});
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('get in app.js called');
  // res.sendFile(path.join(__dirname, '../../dist/cms/browser/index.html'));
  res.sendFile(path.join(__dirname, '/dist/cms/index.html'));
});

module.exports = router;
