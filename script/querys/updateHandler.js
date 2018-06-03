const executeSql = require("../querys/executeHandler");


function editarUtilizador(req, res) {
    executeSql("Update Utilizador set utilizador_nome=?,utilizador_datanascimento=?,utilizador_universidadeID=?,utilizador_cursoID=? where utilizador_alcunha = ?",
        [req.body.nome, req.body.data, req.body.universidade, req.body.curso, req.body.alcunha], function () {
            res.send(console.log("Utilizador atualizado com sucesso na BD!!"));
        });
}

function updatePassword(req, res) {
    executeSql("Update Utilizador set utilizador_password=? where utilizador_email = ?",
        [req.body.password, req.body.email], function () {
            res.send(console.log("Utilizador atualizado com sucesso na BD!!"));
        });
}

module.exports.updatePassword = updatePassword;
module.exports.editarUtilizador = editarUtilizador;