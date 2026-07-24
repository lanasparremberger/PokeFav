con = require("../config/db.js").pool;

module.exports = {
    //....
    async buscaTodos() {
        var sql = "SELECT * FROM produtos";
        return new Promise((resolve, reject) => {
            con.query(sql, (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
    },

}
