//Carregando Modulos
    const express = require('express')
    const bodyParser = require('body-parser')
    //const Produto = require('./models/Produto')
    const handlebars = require('express-handlebars');
    const cors = require('cors');
    const mongoose = require("mongoose");
    //const { post } = require('./Config/Server');
    const app = express();
    const admin = require("./routes/admin")
    const session = require('express-session')
    const flash = require("connect-flash")
    const usuarios = require("./routes/usuario");
    const passport = require('passport');
    require("./config/auth")(passport)


//Configurações
    //Sessão
    app.use(session({
        secret: "dandara",
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    //Middleware
    app.use((req,res, next) => {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null
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
    app.use("/usuarios", usuarios)

    
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

    app.use('/admin', admin)
    



//informação da porta do servidor
const PORT = 3050
app.listen(PORT, function(){
    console.log(`Servidor rodando na porta ${PORT}`)
})