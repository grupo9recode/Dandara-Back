//Carregando Modulos
    const express = require('express')
    const router = express.Router()
    const mongoose = require('mongoose')
    const { createPoolCluster } = require('mysql')
    require('../models/categorias')
    const Categoria = mongoose.model('categorias')
    require('../models/ProdMong')
    const Produto = mongoose.model('produtos');
    const {eAdmin} = require("../helpers/eAdmin")

//Rotas do Admin
    
    //Rota index, apenas para testes
        router.get('/', (req,res) => {
            res.render("admin/index")
        })

    //Rota que retorna as Categorias cadastradas no formato JSON
        router.get('/categorias', async (req,res) => {
            const categoriasResponse = await Categoria.find()
            const categoriasJson = await categoriasResponse
            
            return res.json(categoriasJson)
            
        })

    //Rota para o formulário teste de add Categoria
        router.get('/categorias/add', (req,res) => {
            res.render("admin/addcategorias")
        })

    //rota para criar categorias
        router.post('/categorias/nova', (req,res) => {
        
        /*

        validação de formulário será usado após o termino do Front
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

    //Rota para editar categoria
        router.put("/categorias/:id", async(req,res) =>{
            const {id} = req.params;
            const categoria = await Categoria.findOne({_id: id});

            categoria.nome = req.body.nome;
            categoria.slug = req.body.slug;

            categoria.save();

            res.json({message: "categoria editada"})
        })

    //Pota para deletar categoria
        router.delete('/categorias/delete/:id', eAdmin, async(req,res)=>{
            const{id} = req.params;
            await Categoria.findOneAndDelete({_id:id});

            res.json({message:"Categoria Deletada"});
        })

    //Rota para retornar produtos cadastrados em Json
        router.get("/produtos", async (req,res) => {
            const produtosResponse = await Produto.find().populate("categoria")
            const produtosJson = await produtosResponse
            
            return res.json(produtosJson)
        
        })

    //Rota para cadastrar Produtos
        router.post("/produtos/cad", (req,res) =>{

            /*var erros = []
            if(req.body.categoria == "0"){
                erros.push({message: "Categoria invalida, registre uma categoria"})
            }
            if(erros.length > 0){
                console.log({erros:erros})
            }*/
                const novoProduto = {
                    username: req.body.username,
                    produto: req.body.produto,
                    categoria: req.body.categoria,
                    imagem: req.body.imagem,
                    valor: req.body.valor,
                    descricao: req.body.descricao
                }

                new Produto(novoProduto).save().then(()=> {
                console.log("Produto cadastrado") 
                }).catch((err) =>{
                    console.log(err)
                })
            

        })
    //Rota para alterar produtos
        router.put("/produtos/:id", async(req,res) =>{
            const {id} = req.params;
            const produto = await Produto.findOne({_id: id});
            produto.username = req.body.username;
            produto.produto = req.body.produto;
            produto.categoria = req.body.categoria;
            produto.imagem = req.body.imagem;
            produto.valor = req.body.valor;
            produto.descricao = req.body.descricao
            produto.save();

            res.json({message: "produto editado"})
        })
    
    //Rota para deletar Produto
        router.delete('/produtos/delete/:id', async(req,res)=>{
            const{id} = req.params;
            await Produto.findOneAndDelete({_id:id});

            res.json({message:"Produto Deletado"});
        })

//exportação do modulo
module.exports = router