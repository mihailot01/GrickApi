const pool = require('./connection');
const tabela='sastojci';

const sastojci={
  select: async function(tekst) {
    let conn;
    try {
      conn = await pool.getConnection();
      let q="SELECT * from "+tabela;
      let params=[];
      if(tekst!=undefined)
      {
        tekst2="%";
        for(var i=0;i<tekst.length;i++)
          tekst2+=tekst[i]+"%";
        q+=" WHERE naziv LIKE ?";
        params.push(tekst2);
      }
      console.log(q);
      const res = await conn.query(q,params);
      //console.log(res); 
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  },
  select1: async function(id){
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT * from "+tabela+" where id_sastojka=?", [id]);
      //console.log(res); 
      conn.end();
      return res;
    } catch (err) {
      throw err;
    }
  }
}

module.exports=sastojci;