const pool = require('./connection');
const tabela="recepti_sastojci";

const receptiSastojci={

  select: async function(id_recepta) {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT * from "+tabela+" JOIN sastojci USING(id_sastojka) WHERE id_recepta=?", [id_recepta]);
      //console.log(res); 
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },

  insert: async (id_recepta, sastojci)=>{
    let conn;
    try {
      conn = await pool.getConnection();
      let q="INSERT INTO "+tabela+"(id_recepta,id_sastojka) VALUES ";
      let params=[];
      sastojci.forEach(sastojak => {
        q+="(?,?),";
        params.push(id_recepta,sastojak);
      });
      q = q.substring(0,q.length-1);
      //console.log(q);
      const res = await conn.query(q,params);
      if(res.affectedRows==0)
          throw new Error('Nije uspelo upisivanje u bazu');
      conn.end();
      return res;
    }catch(err) {
      throw err;
    }

  }


}

module.exports=receptiSastojci;