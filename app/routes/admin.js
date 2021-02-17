const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/categorias')
const Categoria = mongoose.model('categorias')


router.get('/', (req,res) => {
    res.render("admin/index")
})

router.get('/produtos', (req,res) => {
    res.send('Pagina de produtos')
})

router.get('/categorias', async (req,res) => {
    const categoriasResponse = await Categoria.find()
    const categoriasJson = await categoriasResponse
    
    return res.json(categoriasJson)
    
})

router.get('/categorias/add', (req,res) => {
    res.render("admin/addcategorias")
})

//rota para criar categorias
router.post('/categorias/nova', (req,res) => {
   
   /*
   validação de formulário
   var erros = []

   if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
   }

   if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "slug inválido"})
    }
   */


    const novaCategoria ={
        nome: req.body.nome,
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() => {
        console.log("Categoria cadastrada com sucesso")
    }).catch((err) => {
        console.log("Erro ao cadastrar a nova categoria")
    })
    

})


//editar categoria
router.put("/categorias/:id", async(req,res) =>{
    const {id} = req.params;
    const categoria = await Categoria.findOne({_id: id});

    categoria.nome = req.body.nome;
    categoria.slug = req.body.slug;

    categoria.save();

    res.json({message: "categoria editada"})
})


module.exports = router