const spisakStavke=require('../database/tabela-spisak-stavke');

async function prikazi(req, res){
  try{
    const id_korisnika=req.dekriptovan.id_korisnika;
    const s = await spisakStavke.select(id_korisnika);
    res.status(200).json(s);
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
}

async function dodaj(req, res){
  try{
    const id_korisnika=req.dekriptovan.id_korisnika;
    const id_sastojka=req.params.id_sastojka;
    const br= await spisakStavke.select1(id_korisnika,id_sastojka)
    if(br>0)
    {
      res.status(200).send("Već je na spisku");
      return;
    }
    const s = await spisakStavke.insert(id_korisnika,id_sastojka);
    res.status(200).json(s);
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
}
async function obrisi(req, res){
  try{
    const id_korisnika=req.dekriptovan.id_korisnika;
    const id_sastojka=req.params.id_sastojka;
    const br= await spisakStavke.select1(id_korisnika,id_sastojka)
    if(br>0)
      await spisakStavke.delete(id_korisnika,id_sastojka);
    res.status(200).send("Izbrisan sa spiska");
  }
  catch(err){
    console.error(err);
    res.status(500).json(err);
  }
}

module.exports = {
  prikazi,
  dodaj,
  obrisi
};