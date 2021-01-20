var express = require('express');
var router = express.Router();
var {auth}=require('../auth/jwt');
const { 
  prikazi,
  obrisi,
  dodaj
}=require('../controllers/spisak-controller');

/* GET home page. */
router
  .get('/', auth, prikazi)
  .post('/dodaj/:id_sastojka', auth, dodaj)
  .post('/obrisi/:id_sastojka', auth, obrisi)
module.exports = router;
