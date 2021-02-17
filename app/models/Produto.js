const db = require('./db');

const Produto = db.sequelize.define('produtos',{
    username:{
        type: db.Sequelize.STRING
    },
    produto: {
        type: db.Sequelize.STRING
    },
    categoria: {
        type: db.Sequelize.STRING
    },
    imagem: {
        type: db.Sequelize.TEXT
    },
    valor:{
        type: db.Sequelize.DECIMAL
    },
    descricao:{
        type: db.Sequelize.TEXT
    }

})

module.exports = Produto