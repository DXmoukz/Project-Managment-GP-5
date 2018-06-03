const mysql = require("mysql");
const connectionOptions = require("../../JSON/mySqlConnection.json");

function execute(sqlCommand, values, callback) {
    var sql = mysql.format(sqlCommand, values);
    var connection = mysql.createConnection(connectionOptions);
    connection.connect();
    connection.query(sql, function (err, results, fields) {
        if (err) {
            console.log(err);
        } else {
            callback(results, fields);
        }
    });
    connection.end();
}
module.exports = execute;