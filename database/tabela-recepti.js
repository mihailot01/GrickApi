const pool = require('./connection');
const { select } = require('./tabela-recepti-sastojci');
const tabela='recepti';

const recepti={

  select: async function() {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT id_recepta, naziv, datum_kreiranja, opis ,korisnici.username as autor, slika from "+tabela+" JOIN korisnici ON autor=id_korisnika");
      //const recepti=res[0];
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },
  select1: async function(id_recepta) {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT id_recepta, naziv, datum_kreiranja, opis ,korisnici.username as autor, slika from "+tabela+" JOIN korisnici ON autor=id_korisnika WHERE id_recepta=?", [id_recepta]);
      //const recepti=res[0];
      conn.end();
      return res[0];
    } catch (err) {
      throw err;
    }
  },
  selectParams: async function(params)
  {
    if(params.sastojci==undefined)
      return this.select();
    let conn;
    try {
      let qParams=[];
      let pom="(";
      params.sastojci.forEach(sastojak => {
        pom+="?,";
        qParams.push(sastojak);
      });
      pom = pom.substring(0,pom.length-1);
      pom +=")";
      qParams.push(params.sastojci.length);
      conn = await pool.getConnection();
      let q="SELECT *,korisnici.username as autor FROM "+tabela
      +" JOIN korisnici ON autor=id_korisnika"
      +" JOIN recepti_sastojci USING(id_recepta)" 
      +" WHERE id_sastojka IN"+pom
      +" GROUP BY id_recepta"
      +" HAVING COUNT(DISTINCT id_sastojka) = ?";
      const res = await conn.query(q,qParams);
      //const recepti=res[0];
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },
  selectMoji: async function(id_korisnika){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT id_recepta, naziv, datum_kreiranja, opis ,korisnici.username as autor, slika from "+tabela+" JOIN korisnici ON autor=id_korisnika WHERE id_korisnika=?", [id_korisnika]);
      //const recepti=res[0];
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },
  selectOmiljeni: async function(id_korisnika){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT id_recepta, naziv, datum_kreiranja, opis ,korisnici.username as autor, slika from "+tabela+" JOIN korisnici ON autor=id_korisnika JOIN svidjanja USING(id_recepta) WHERE svidjanja.id_korisnika=?", [id_korisnika]);
      //const recepti=res[0];
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },
  insert: async function(recept){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("INSERT INTO "+tabela+" (naziv,autor,datum_kreiranja,opis) VALUES (?,?,?,?)", [recept.naziv,recept.autor,new Date(),recept.opis]);
      console.log(res); 
      if(res.affectedRows==0)
        throw new Error('Nije uspelo upisivanje u bazu');
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  }

}

module.exports=recepti;