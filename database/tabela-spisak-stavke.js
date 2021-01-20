const pool = require('./connection');
const tabela='spisak_stavke';

const spisakStavke={
  
  select: async function(id_korisnika){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT id_sastojka, naziv from "+tabela+" JOIN sastojci USING(id_sastojka) WHERE id_korisnika=?", [id_korisnika]);
      //const recepti=res[0];
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },
  select1: async function(id_korisnika,id_sastojka){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT COUNT(*) as br from "+tabela+" JOIN sastojci USING(id_sastojka) WHERE id_korisnika=? AND id_sastojka=?", [id_korisnika,id_sastojka]);
      //const recepti=res[0];
      conn.end();
      return res[0].br;
    } catch (err) {
      throw err;
    }
  },
  insert: async function(id_korisnika,id_sastojka){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("INSERT INTO "+tabela+" (id_korisnika,id_sastojka) VALUES (?,?)", [id_korisnika,id_sastojka]);
      if(res.affectedRows==0)
        throw new Error('Nije uspelo upisivanje u bazu');
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },
  delete: async function(id_korisnika, id_sastojka){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("DELETE FROM "+tabela+" WHERE id_korisnika=? AND id_sastojka=?", [id_korisnika,id_sastojka]);
      if(res.affectedRows==0)
        throw new Error('Nije uspelo brisanje');
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  }

}

module.exports=spisakStavke;