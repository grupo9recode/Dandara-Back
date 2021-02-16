var mysql = require('mysql');

let connMySQL = function(){
    console.log('MySQL: Conexão estabelecida com o DB');
    return connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'dandara'
    })
}

module.exports = function(){
    return connMySQL;
}