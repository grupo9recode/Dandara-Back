const express = require('express')
const bodyParser = require('body-parser')
const Produto = require('./models/Produto')
const handlebars = require('express-handlebars')
const app = express();



//Config
    //Templete Engine
        app.engine('handlebars', handlebars({defaultLayout:'main'}))
        app.set('view engine', 'handlebars')

    //Configurando o Body-parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())



//Rotas

app.get('/', function(req,res){
    res.render('home')
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
app.listen(3050, function(){
    console.log('Servidor rodando na porta 3050')
})