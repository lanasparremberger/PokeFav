const express = require('express');
var session = require('express-session');
const app = express();
const con = require("./config/db.js").pool;

app.use(session({
	secret: '2C44-4D44-WppQ38S', resave: false, saveUninitialized: true
}));
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use( express.static("public") );
app.use(express.static("src")); 

// const produtoController = require("./controller/usuarioController");
// app.get('/cadastrar',produtoController.create);
//...
app.get('/',function(req,res){
    res.render('index');
});

app.listen(3300,function(){
    console.log("Servidor Escutando na porta 80");
});