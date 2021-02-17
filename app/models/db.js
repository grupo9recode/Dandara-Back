const Sequelize = require('sequelize');

//Configuração do banco de dados
const sequelize = new Sequelize('dandara', 'root', '', {
    host:'localhost',
    dialect: 'mysql'
})
//autenticação do banco de dados
sequelize.authenticate().then(function(){
    console.log("MySQL Conectado com sucesso ")
}).catch(function(erro){
    console.log("Falha ao se conectar: " +erro)
})

module.exports =  {
    Sequelize: Sequelize,
    sequelize: sequelize
}