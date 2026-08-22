const express = require('express');
const mysql = require('mysql');
const formidable = require('formidable');
const fs = require('fs');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(express.static("src"));
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: true
}));
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pokefav"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Conectado!");
});
app.post('/cadastro', function (req, res) {
    bcrypt.hash(req.body['senha'], saltRounds, function (err, hash) {
        var sql = "INSERT INTO usuario (nome, nome_usuario, email, senha, imagem_usuario, tipo_fav) VALUES ?";
        var values = [
            [req.body['nome'], req.body['nome_usuario'], req.body['email'], hash, req.body['imagem_usuario'], req.body['tipo_fav']]
        ];
        con.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Numero de registros inseridos: " + result.affectedRows);
        });
    });
    res.redirect('/login');
});

app.get('/cadastro', function (req, res) {
    const sql = 'SELECT * FROM tipo';

    con.query(sql, function (erro, tipos) {
        if (erro) {
            console.error(erro);
            return res.status(500).send('Erro ao buscar tipos');
        }

        res.render('usuario/cadastro', {
            tipos: tipos
        });
    });
});
app.get('/login', function (req, res) {
    var mensagem = null;
    if (req.session.mensagem) {
        mensagem = req.session.mensagem;
        req.session.mensagem = null;
    }
    res.render('usuario/login.ejs', { mensagem: mensagem });
});
app.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        // cannot access session here
    })
    res.redirect('/login');
});
app.post('/login', function (req, res) {
    var senha = req.body['senha'];
    var email = req.body['email'];
    var sql = "SELECT * FROM usuario where email = ?";
    con.query(sql, [email], function (err, result) {
        if (err) throw err;
        if (result.length) {
            bcrypt.compare(senha, result[0]['senha'], function (err, resultado) {
                if (err) throw err;
                if (resultado) {
                    req.session.loggedin = true;
                    req.session.username = result[0]['nome'];
                    res.redirect('/adicionar');
                }
                else {
                    req.session.mensagem = "Senha inválida";
                    res.redirect('login');
                }
            });
        }
        else {
            req.session.mensagem = "E-mail não encontrado";
            res.redirect('login');
        }
    });
});
// rota com controle de acesso somente se adiciona o if, dentro dele segue o
//comportamento normal, no else redireciona para a rota de login ou só mostra a telade login com a mensagem
app.get('/adicionar', function (req, res) {
    if (req.session.loggedin) {
        res.render('pokemon/create.ejs');
    } else {
        req.session.mensagem = "Por favor realize o login para acessar a página";
        res.redirect('login');
    }
});
app.get('/', function (req, res) {
    res.render('index.ejs');
});

app.listen(3300, function () {
    console.log("Servidor Escutando na porta 3300");
});




// const express = require('express');
// var session = require('express-session');
// const app = express();
// const con = require("./config/db.js").pool;

// app.use(session({
// 	secret: '2C44-4D44-WppQ38S', resave: false, saveUninitialized: true
// }));
// app.use(express.urlencoded({extended: true}))
// app.set('view engine', 'ejs')
// app.use( express.static("public") );
// app.use(express.static("src"));

// // const produtoController = require("./controller/usuarioController");
// // app.get('/cadastrar',produtoController.create);
// //...
// app.get('/',function(req,res){
//     res.render('index');
// });

// app.listen(3300,function(){
//     console.log("Servidor Escutando na porta 80");
// });