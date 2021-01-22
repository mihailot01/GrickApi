const pool = require('./connection');
const tabela='koraci';

const koraci={

  select: async function(id_recepta) {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT * from "+tabela+" WHERE id_recepta=?", [id_recepta]);
      //console.log(res); 
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },
  insert: async function(id_recepta,koraci){
    let conn;
    try {
      conn = await pool.getConnection();
      let q="INSERT INTO "+tabela+" (ind,tekst,id_recepta) VALUES ";
      let params=[];
      koraci.forEach((korak,index) => {
        q+="(?,?,?),";
        params.push(index,korak.tekst,id_recepta);
      });
      q=q.substring(0,q.length-1);
      const res = await conn.query(q,params);
      if(res.affectedRows==0)
        throw new Error('Nije uspelo upisivanje u bazu');
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },
  
  upisiSliku: async function(putanja,id_recepta, ind){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("UPDATE "+tabela+" SET slika=? WHERE id_recepta=? AND ind=?", [putanja,id_recepta,ind]);
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

module.exports=koraci;