const executeSql = require("../querys/executeHandler");

function getUtilizadorFromEmailPassword(req, res) {
    executeSql("SELECT * FROM Utilizador WHERE utilizador_email = ? AND utilizador_password = ?",
        [req.body.email, req.body.password], function (rows) {
            res.send(rows);
        });
}

function getUtilizadorFromEmail(req, res) {
    executeSql("SELECT * FROM Utilizador WHERE utilizador_email = ?",
        [req.body.email], function (rows) {
            res.send(rows);
        });
}

function getUtilizadorFromID(req, res) {
    executeSql("SELECT * FROM Utilizador WHERE utilizador_id = ?",
        [req.body.id], function (rows) {
            res.send(rows);
        });
}

function getUniversidade(req, res) {
    executeSql("SELECT * FROM Universidades",
        [], function (rows) {
            res.send(rows);
        });
}
function getCursos(req, res) {
    executeSql("SELECT * FROM Cursos",
        [], function (rows) {
            res.send(rows);
        });
}

function getAreaCientifica(req, res) {
    executeSql("SELECT * FROM AreaCientifica",
        [], function (rows) {
            res.send(rows);
        });
}

function getCursoID(req, res) {
    executeSql("SELECT * FROM Cursos where curso_nome = ?",
        [req.body.cur], function (rows) {
            res.send(rows);
        });
}

function getUniversidadeID(req, res) {
    executeSql("SELECT * FROM Universidades where universidade_nome = ?",
        [req.body.uni], function (rows) {
            res.send(rows);
        });
}

function getPortfolio(req, res) {
    executeSql("SELECT * FROM Portfolio where portfolio_nome = ?",
        [req.body.nome], function (rows) {
            res.send(rows);
        });
}

function getAreasFromPortfolio(req, res) {
    executeSql("SELECT area_nome FROM portfolios_areacientifica " +
    "join areacientifica on portfolioArea_areaID = area_id where portfolioArea_portfolioID = ?",
        [req.body.id], function (rows) {
            res.send(rows);
        });
}

function getEquipaFromPortfolio(req, res) {
    executeSql("SELECT equipa_nome, equipa_email, equipa_telefone FROM portfolio_equipa where equipa_portfolioID = ?",
        [req.body.id], function (rows) {
            res.send(rows);
        });
}

function getPortfolioFromUtilizadorID(req, res) {
    executeSql("SELECT * FROM Portfolio WHERE portfolio_utilizadorID = ?",
        [req.body.utilizadorID], function (rows) {
            res.send(rows);
        });
}

/**
 * //--Daniel
 */

function getPortfoliosUtilizador(req, res) {
    executeSql("SELECT portfolio_nome FROM Portfolio where portfolio_utilizadorID = ?",
        [req.body.id], function (rows) {
            res.send(rows);
        });
}

function getPortfoliosFromArea(req, res) {
    executeSql("SELECT portfolio_nome FROM Portfolio " +
        "join portfolios_areacientifica on portfolio_id = portfolios_areacientifica.portfolioArea_portfolioID " +
        "join areacientifica on portfolioArea_areaID = area_id where area_nome = ?", [req.body.area], function (rows) {
            res.send(rows);
        });
}

function getPortfolios(req, res) {
    executeSql("SELECT * FROM Portfolio",
        [], function (rows) {
            res.send(rows);
        });
}
module.exports.getPortfolios = getPortfolios;
module.exports.getPortfoliosFromArea = getPortfoliosFromArea;
module.exports.getPortfoliosUtilizador = getPortfoliosUtilizador;
/**
 * 
 */

module.exports.getUtilizadorFromID = getUtilizadorFromID;
module.exports.getAreasFromPortfolio = getAreasFromPortfolio;
module.exports.getEquipaFromPortfolio = getEquipaFromPortfolio;
module.exports.getPortfolio = getPortfolio;
module.exports.getUniversidadeID = getUniversidadeID;
module.exports.getCursoID = getCursoID;
module.exports.getUtilizadorFromEmail = getUtilizadorFromEmail;
module.exports.getUtilizadorFromEmailPassword = getUtilizadorFromEmailPassword;
module.exports.getUniversidade = getUniversidade;
module.exports.getCursos = getCursos;
module.exports.getAreaCientifica = getAreaCientifica;

module.exports.getPortfolioFromUtilizadorID=getPortfolioFromUtilizadorID;
