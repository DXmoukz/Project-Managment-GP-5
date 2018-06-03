const mysql = require("mysql");
const connectionOptions = require("../../JSON/mySqlConnection.json");

function executeTESTE(sqlCommand, values, callback) {
    var sql = mysql.format(sqlCommand, values);
    var connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, results, fields) {
        if (err) {
            console.log(err);
        } 
    });
    connection.end();
}
module.exports = executeTESTE;