const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: "127.0.0.1", 
     user: 'root', 
     password: '',
     database: 'grick'
     //connectionLimit: 5
});

module.exports=pool;