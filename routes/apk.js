var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  const file = `${__dirname}/../app-release.apk`;
  res.download(file); // Set disposition and send it.
});

module.exports = router;
