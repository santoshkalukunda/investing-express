var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', //
  password: '', //
  database: 'smicaj',
})
connection.connect((err) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('MYSQL Database connected');
})
module.exports = connection