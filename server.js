const express = require('express');
var session = require('express-session');
const app = express();


app.use(session({
	secret: '2C44-4D44-WppQ38S', resave: false, saveUninitialized: true
}));
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use( express.static("public") );


const produtoController = require("./controller/usuarioController");
app.get('/cadastrar',produtoController.create);
//...
app.listen(80,function(){
    console.log("Servidor Escutando na porta 80");
});
