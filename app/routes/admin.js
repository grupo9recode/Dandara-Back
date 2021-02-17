const express = require('express')
const router = express.Router()

router.get('/', (req,res) => {

})

router.get('/produtos', (req,res) => {
    
})

router.get('/categorias', (req,res) => {
    res.render('admin/categorias')
})

router.get('/categorias/add', (req,res) => {
    res.render("admin/addcategorias")
})

module.exports = router