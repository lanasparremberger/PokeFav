const con = require("../config/db.js").pool;

function deleta(id) {
    const sql = "DELETE FROM produtos WHERE id = ?";
    return new Promise((resolve, reject) => {
        con.query(sql, id, function (err, result) {
            if (err) return reject(err);
            console.log("Numero de registros Apagados: " + result.affectedRows);
            resolve(result);
        });
    });
}

async function buscaTodos() {
    const sql = "SELECT * FROM produtos";
    return new Promise((resolve, reject) => {
        con.query(sql, (err, row) => {
            if (err) return reject(err);
            resolve(row);
        });
    });
}

module.exports = { deleta, buscaTodos };