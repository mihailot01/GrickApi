var express = require('express');
var router = express.Router();
const { 
  prikazi,
  prikaziJedan
}=require('../controllers/sastojci-controller');

/* GET home page. */
router
  .get('/', prikazi)
  .get('/:id', prikaziJedan)

module.exports = router;
