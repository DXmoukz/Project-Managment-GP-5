const executeSql = require("../script/executeHandler");

var path = require("path");

/**
 * Função para receber os dados de um novo utilizador atraves do post da pagina registo
 */

function insertIntoUtilizador(req, res) {
    executeSql("INSERT INTO Utilizador (utilizador_nome,utilizador_alcunha,utilizador_email,utilizador_datanascimento,utilizador_password,utilizador_isSuport) VALUES (?,?,?,?,?,?)",
        [req.body.nome, req.body.alcunha,req.body.email,req.body.dataNascimeto,req.body.password,req.body.isSuport], 
        function () {
            res.send(console.log("Utilizador adicionado com sucesso na BD!!"));
        });
}


module.exports.insertIntoUtilizador=insertIntoUtilizador;