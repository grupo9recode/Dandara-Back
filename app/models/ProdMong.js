const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//definindo Models de produto com Mongo
const Produto = new Schema({
    username:{
        type: String,
        required: true
    },
    produto: {
        type: String,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias",
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
    valor:{
        type: Number,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    data:{
        type: Date,
        default: Date.now()
    }
})

mongoose.model("produtos", Produto)