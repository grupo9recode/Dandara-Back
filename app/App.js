//Carregando Modulos
    const express = require('express')
    const bodyParser = require('body-parser')
    const Produto = require('./models/Produto')
    const handlebars = require('express-handlebars');
    const cors = require('cors');
    const mongoose = require("mongoose");
    //const { post } = require('./Config/Server');
    const app = express();
    const admin = require("./routes/admin")
    const session = require('express-session')
    const flash = require("connect-flash")


//Configurações
    //Sessão
    app.use(session({
        secret: "dandara",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())
    //Middleware
    app.use((req,res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })

    //Handlebars
    app.engine('handlebars', handlebars({defaultLayout:'main'}))
    app.set('view engine', 'handlebars')
    //Body-parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    //Cors
    app.use(cors())
    //Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/dandara').then(() =>{
        console.log("MongoDb Conectado a Dandara")
    }).catch((err) =>{
        console.log("Erro ao se conectar ao Mongo: " +err)
    })



//Rotas
    
    //rota adminitrativa
    app.use('/admin',admin)

    //retorno dos dados em Json
    app.get('/', async (req,res) => {
    const produtosResponse = await Produto.findAll()
    const produtosJson = await produtosResponse
         return res.json(produtosJson)
    })

    //deletando produto   
    app.get('/delete/:id', function(req,res){
    Produto.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("POstagem deletada com sucesso!")
    }).catch(function(erro){
        res.send('Esta postagem não existe')
    })
    })

    //rota do formulario teste
    app.get('/cad', function(req, res){
    res.render('formulario')
    })
    
    //rota do envio dos dados do formulario
    app.post('/addproduto', function(req,res){
    Produto.create({
        username: req.body.username,
        produto: req.body.produto,
        categoria: req.body.categoria,
        imagem: req.body.imagem,
        valor: req.body.valor,
        descricao: req.body.descricao
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send("Houve um erro: "+erro)
    })
    
    })



//informação da porta do servidor
const PORT = 3050
app.listen(PORT, function(){
    console.log(`Servidor rodando na porta ${PORT}`)
})