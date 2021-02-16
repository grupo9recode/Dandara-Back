var mongoose = require('mongoose')

module.exports = function (app) {

    app.get('/usuarios', async (req,res) =>{
        const usuariosResponse = await Usuario.find()
        const usuariosJson = await usuariosResponse
    
        return res.json(usuariosJson)
    });

    app.post('/usuarios', async(req,res) =>{

        const validate = await Usuario.findOne({cpf:req.body.cpf})
    if(validate){
        return res.json({massage:"Já esxite um usuario cadastrado com esse cpf, tente recuperar sua senha"})
    }else{

    const novoUsuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        cpf: req.body.cpf,
        nis: req.body.nis,
        rua: req.body.rua,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
        senha: req.body.senha,
    });

    novoUsuario.save()

    res.json({message:"Cadastro Concluido com Sucesso", usuario: novoUsuario})
    }
    })

}