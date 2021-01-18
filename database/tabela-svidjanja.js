const pool = require('./connection');
const tabela='svidjanja';

const svidjanja={

  select: async function(id_korisnika,id_recepta) {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT * from "+tabela+" WHERE id_korisnika=? AND id_recepta=?", [id_korisnika,id_recepta]);
      //console.log(res); 
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },
  selectCnt: async function(id_recepta)
  {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT COUNT(*) as br from "+tabela+" WHERE id_recepta=?", [id_recepta]);
      //console.log(res); 
      conn.end();
      return res[0].br;
    } catch (err) {
      throw err;
    }
  },
  staviLajk: async function(id_korisnika,id_recepta) {
    let conn;
    
    try {
      conn = await pool.getConnection();
      const res = await conn.query("INSERT INTO "+tabela+" (id_korisnika,id_recepta) VALUES (?,?)", [id_korisnika,id_recepta]);
      console.log(res); 
      if(res.affectedRows==0)
        throw new Error('Nije uspelo upisivanje u bazu');
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },

  skiniLajk: async function(id_korisnika,id_recepta){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("DELETE FROM "+tabela+" WHERE id_korisnika=? AND id_recepta=?", [id_korisnika,id_recepta]);
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

module.exports=svidjanja;