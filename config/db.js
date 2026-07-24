const mysql = require("mysql");
var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "pokedex"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Conectado!");
    var sql = "CREATE DATABASE pokedex"

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Base de dados criada");
    });
    con.end();
});

exports.pool = pool;
