const sastojci=require('../database/tabela-sastojci');

async function prikazi(req, res) {
  try{
    const s = await sastojci.select();
    res.status(200).json(s);
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
}

async function prikaziJedan(req, res) {
  try{
    const s = await sastojci.select1(req.params.id);
    //console.log("S: "+s);
    res.status(200).json(s);
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
}


module.exports = {
  prikazi,
  prikaziJedan
};