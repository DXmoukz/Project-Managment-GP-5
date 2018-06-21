const executeSql = require("../querys/executeHandler");


function editarUtilizador(req, res) {
    executeSql("Update Utilizador set utilizador_nome=?,utilizador_datanascimento=?,utilizador_universidadeID=?,utilizador_cursoID=? where utilizador_alcunha = ?", [req.body.nome, req.body.data, req.body.universidade, req.body.curso, req.body.alcunha], function() {
        res.send(console.log("Utilizador atualizado com sucesso na BD!!"));
    });
}

function updatePassword(req, res) {
    executeSql("Update Utilizador set utilizador_password=? where utilizador_email = ?", [req.body.password, req.body.email], function() {
        res.send(console.log("Utilizador atualizado com sucesso na BD!!"));
    });
}

function updatePortfolio(req, res) {
    executeSql("Update Portfolio set portfolio_aceite = ? where portfolio_id = ?", [req.body.estado, req.body.portfolioID], function() {
        res.send(console.log("Portfolio atualizado com sucesso na BD!!"));
    });
}

function editarPortfolio(req, res) {
    executeSql("Update Portfolio set portfolio_nome = ?, portfolio_descricao = ?, portfolio_motivacoes = ?, porfolio_partilha = ? where portfolio_id = ?", [req.body.nome, req.body.descricao, req.body.motivacoes, req.body.partilha, req.body.id], function() {
        res.send(console.log("Portfolio atualizado com sucesso na BD!!"));
    });
}

function updateUserIsSuport(req, res) {
    executeSql("Update Utilizador set utilizador_isSuport = ? where utilizador_id = ?", [req.body.isSuport, req.body.utilizadorID], function() {
        res.send(console.log("Portfolio atualizado com sucesso na BD!!"));
    });
}
module.exports.updateUserIsSuport = updateUserIsSuport;
module.exports.updatePassword = updatePassword;
module.exports.editarUtilizador = editarUtilizador;
module.exports.updatePortfolio = updatePortfolio;
module.exports.editarPortfolio = editarPortfolio;