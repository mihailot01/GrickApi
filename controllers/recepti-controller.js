const recepti=require('../database/tabela-recepti');
const receptiSastojci=require('../database/tabela-recepti-sastojci');
const koraci=require('../database/tabela-koraci');


async function prikazi(req, res) {
  try{
    const r= await recepti.select();
    for(let i=0;i<r.length;i++)
    {
      r[i].koraci=await koraci.select(r[i].id_recepta); 
      r[i].sastojci=await receptiSastojci.select(r[i].id_recepta);
    }
    res.status(200).json(r);
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
}


async function noviRecept(req,res){

  try{
    const r=await recepti.insert(req.body);
    const id_recepta=r.insertId;
    //console.log(req.body.sastojci);
    if(req.body.sastojci.length>0)
      receptiSastojci.insert(id_recepta,req.body.sastojci);
    if(req.body.koraci.length>0)
      koraci.insert(id_recepta,req.body.koraci);
    res.status(200).json(r);
  } catch(err){
    console.error(err);
    res.status(500).json(err);
  }
}



module.exports = {
  prikazi,
  noviRecept
};