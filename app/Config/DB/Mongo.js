var mongoose = require('mongoose');

function connectMong(){
    mongoose
    .connect('mongodb://localhost/dandara',{useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log('MongoDb: Conectado com o banco Dandara')       
    }).catch((error) => {
        console.log(`Erro ao se conectar ao banco Dandara ${error}`)
    })
}

module.exports = connectMong()