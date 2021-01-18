const pool = require('./connection');
const tabela='recepti';

const recepti={

  select: async function() {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT id_recepta, naziv, datum_kreiranja, opis ,korisnici.username as autor from "+tabela+" JOIN korisnici ON autor=id_korisnika");
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
      const res = await conn.query("SELECT id_recepta, naziv, datum_kreiranja, opis ,korisnici.username as autor from "+tabela+" JOIN korisnici ON autor=id_korisnika WHERE id_korisnika=?", [id_korisnika]);
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
      const res = await conn.query("SELECT id_recepta, naziv, datum_kreiranja, opis ,korisnici.username as autor from "+tabela+" JOIN korisnici ON autor=id_korisnika JOIN svidjanja USING(id_recepta) WHERE svidjanja.id_korisnika=?", [id_korisnika]);
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