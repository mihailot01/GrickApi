const pool = require('./connection');
const tabela='sastojci';

const sastojci={
  select: async function() {
    let conn;
    try {
      conn = await pool.getConnection();
      const res = await conn.query("SELECT * from "+tabela);
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