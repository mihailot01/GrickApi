const recepti=require('../database/tabela-recepti');
const receptiSastojci=require('../database/tabela-recepti-sastojci');
const koraci=require('../database/tabela-koraci');
const svidjanja=require('../database/tabela-svidjanja');
const jwt=require('../auth/jwt');

async function prikazi(req, res) {
  try{
    const r= await recepti.select();
    let id_korisnika = await jwt.decrypt(req.headers.authorization);
    if(id_korisnika!=null)
      id_korisnika=id_korisnika.id_korisnika;
    console.log(id_korisnika);
    for(let i=0;i<r.length;i++)
    {
      r[i].koraci=await koraci.select(r[i].id_recepta); 
      r[i].sastojci=await receptiSastojci.select(r[i].id_recepta);
      r[i].svidjanja=await svidjanja.selectCnt(r[i].id_recepta);
      if(id_korisnika!=null)
      {
        ret=await svidjanja.select(id_korisnika,r[i].id_recepta);
        r[i].lajkovan=ret.length>0;
      }
    }
    res.status(200).json(r);
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
}

async function mojiRecepti(req, res) {
  try{
    const id_korisnika=req.dekriptovan.id_korisnika;
    const r= await recepti.selectMoji(id_korisnika);
    for(let i=0;i<r.length;i++)
    {
      r[i].koraci=await koraci.select(r[i].id_recepta); 
      r[i].sastojci=await receptiSastojci.select(r[i].id_recepta);
      r[i].svidjanja=await svidjanja.selectCnt(r[i].id_recepta);
      r[i].lajkovan=true;
    }
    res.status(200).json(r);
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
}

async function omiljeniRecepti(req, res) {
  try{
    const id_korisnika=req.dekriptovan.id_korisnika;
    const r= await recepti.selectOmiljeni(id_korisnika);
    for(let i=0;i<r.length;i++)
    {
      r[i].koraci=await koraci.select(r[i].id_recepta); 
      r[i].sastojci=await receptiSastojci.select(r[i].id_recepta);
      r[i].svidjanja=await svidjanja.selectCnt(r[i].id_recepta);
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
    req.body.autor=req.dekriptovan.id_korisnika;
    //console.log(req.dekriptovan.id_korisnika,req.body);
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

async function staviLajk(req,res){
  id_recepta=parseInt(req.params.id_recepta);
  id_korisnika=req.dekriptovan.id_korisnika;
  try {
    ret=await svidjanja.select(id_korisnika,id_recepta);
    if(ret.length>0)
    {
      res.status(200).send("Dodato u svidjanja");
      return;
    }
    ret=await svidjanja.staviLajk(id_korisnika,id_recepta);
    res.status(200).send("Dodato u svidjanja");
  } catch (err) {
    res.status(500).json(err);  
  }
  //res.status(200).json([id_recepta,id_korisnika]);
}


async function skiniLajk(req,res){
  id_recepta=parseInt(req.params.id_recepta);
  id_korisnika=req.dekriptovan.id_korisnika;
  try {
    ret=await svidjanja.select(id_korisnika,id_recepta);
    if(ret.length==0)
    {
      res.status(200).send("Izbrisano iz svidjanja");
      return;
    }
    ret=await svidjanja.skiniLajk(id_korisnika,id_recepta);
    res.status(200).send("Izbrisano iz svidjanja");
  } catch (err) {
    res.status(500).json(err);  
  }
}

module.exports = {
  prikazi,
  mojiRecepti,
  omiljeniRecepti,
  noviRecept,
  staviLajk,
  skiniLajk
};