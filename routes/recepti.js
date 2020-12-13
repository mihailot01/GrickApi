var express = require('express');
var router = express.Router();
var {auth}=require('../auth/jwt');
const { 
  prikazi,
  noviRecept
}=require('../controllers/recepti-controller');
const recepti = require('../database/tabela-recepti');

/* GET users listing. */
router.get('/', prikazi);
router.post('/', auth, noviRecept);

module.exports = router;
