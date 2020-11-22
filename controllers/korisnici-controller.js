const korisnici=require('../database/tabela-korisnici');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function prikazi(req, res) {
  try{
    const s = await korisnici.select();
    res.status(200).json(s);
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
}

async function prikaziJedan(req, res) {
  try{
    const s = await korisnici.select1(req.params.id);
    //console.log("S: "+s);
    res.status(200).json(s);
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
}

async function signUp(req,res){

  try{
    const hash = await bcrypt.hash(req.body.password, saltRounds);
    const r = await korisnici.insert(req.body.username, hash);
    //console.log(r);
    res.status(200).json(r);
  } catch(err){
    console.error(err);
    if(err.message=='Korisnik sa unetim imenom već postoji')
      res.status(403).json(err);
    else
      res.status(500).json(err);
  }
}


module.exports = {
  prikazi,
  prikaziJedan,
  signUp
};