const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")
const bcrypt = require("bcryptjs")
const passport = require("passport")


router.get("/registro", (req, res) => {
    res.render("usuarios/registro")
})


router.post("/registro", (req,res) => {
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome ==null){
        erros.push({texto: "Nome inválido"})
    }

    if(!req.body.username || typeof req.body.username == undefined || req.body.username ==null){
        erros.push({texto: "Username inválido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha ==null){
        erros.push({texto: "Senha inválido"})
    }

    if(req.body.senha.length < 4){
        erros.push({texto: "Senha muito curta"})
    }

    /*if(req.body.senha != req.body.senha2){
        erros.push({texto: "As senhas não coincidem"})
    }*/

    if(erros.length > 0){

        res.render("usuarios/registro", {erros: erros})

    }else{

        Usuario.findOne({email: req.body.username}).then((usuario) => {
            if(usuario){
                req.flash("error_msg", "Já existe uma conta com este username no nosso sistema")
                res.redirect("/usuarios/registro")
            }else{

                const novoUsuario = new Usuario({
                    username: req.body.username,
                    nome: req.body.nome,
                    cpf: req.body.cpf,
                    numnis: req.body.numnis,
                    celular: req.body.celular,
                    email: req.body.email,
                    senha: req.body.senha,
                    eAdmin: 1
                })

                bcrypt.genSalt(10, (erro, salt) => {
                    bcrypt.hash(novoUsuario.senha, salt, (erro, hash) => {
                        if(erro){
                            req.flash("erro_msg", "Houve um erro durante o salvamento do usuário")
                            res.redirect("/")
                        }

                        novoUsuario.senha = hash

                        novoUsuario.save().then(() =>{
                            req.flash("sucess_msg", "Usuário criado com sucesso!")
                            res.redirect("/")
                        }).catch((err) => {
                            req.flash("error_msg", "Houve um erro ao criar o usuario, tente novamente!")
                            res.redirect("/usuarios/registro")
                        })
                    })
                })

            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })

    }

})

router.get("/login", (req,res) => {
    res.render("usuarios/login")
})

router.post("/login", (req,res,next) => {

    passport.authenticate("local", {
        successRedirect: "http://localhost:3000/minhaconta",
        failureRedirect: "/",
        failureFlash: true
    })(req,res,next)
    console.log("logado!")
})

//Sistema de logout
router.get("/logout", (req,res) => {
    req.logout()
    req.flash('sucess_msg', "Deslogado com sucesso!")
    res.redirect("/")
})

module.exports = router