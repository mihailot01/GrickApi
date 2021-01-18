var express = require('express');
const { createPoolCluster } = require('mariadb');
var router = express.Router();
var {auth}=require('../auth/jwt');
const { 
  prikazi,
  mojiRecepti,
  omiljeniRecepti,
  noviRecept,
  staviLajk,
  skiniLajk
}=require('../controllers/recepti-controller');
const recepti = require('../database/tabela-recepti');

/* GET users listing. */
router.get('/', prikazi);
router.get('/moji', auth, mojiRecepti);
router.get('/omiljeni', auth, omiljeniRecepti);
router.post('/', auth, noviRecept);
router.post('/:id_recepta/like', auth, staviLajk);
router.post('/:id_recepta/dislike', auth, skiniLajk);

module.exports = router;
