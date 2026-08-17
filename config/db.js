var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pokefav"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Conectado!");
    con.end();
});
