var express = require('express');
var router = express.Router();
const { 
  signUp
}=require('../controllers/korisnici-controller');

/* GET users listing. */
router.post('/signup', signUp);

module.exports = router;
