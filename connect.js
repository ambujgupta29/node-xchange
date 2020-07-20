
const mysql= require('mysql')
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database:"xchange"
})
con.connect(function(err) {
  if (err) throw err;
  console.log('connected');
})

module.exports=con
