const executeSql = require("../querys/executeTESTE");
/**
 * Função para receber os dados de um novo utilizador atraves do post da pagina registo
 */

function insertIntoUtilizador(req, res) {
    executeSql("INSERT INTO Utilizador (utilizador_nome,utilizador_alcunha,utilizador_email,utilizador_telefone,utilizador_datanascimento,utilizador_password,utilizador_universidadeID,utilizador_cursoID,utilizador_isSuport) VALUES (?,?,?,?,?,?,?,?,?)",
        [req.body.nome, req.body.alcunha, req.body.email, req.body.telefone, req.body.dataNascimeto, req.body.password, req.body.universidadeID, req.body.cursoID, req.body.isSuport]);
}

function insertIntoPortfolio(req, res) {
    executeSql("INSERT INTO Portfolio (portfolio_nome,portfolio_descricao,portfolio_motivacoes,portfolio_utilizadorID,porfolio_partilha,portfolio_aceite) VALUES (?,?,?,?,?,?)",
        [req.body.nome, req.body.descricao, req.body.motivacao, req.body.utilizadorID, req.body.partilha, req.body.portfolioAceite]);
}
function insertIntoPrtfolioAreaCientifica(req, res) {
    executeSql("INSERT INTO Portfolios_AreaCientifica (portfolioArea_portfolioID,portfolioArea_areaID) VALUES (?,?)",
        [req.body.portfolioID, req.body.areaID]);
}

function insrtIntoPortfolioEquipa(req, res) {
    executeSql("INSERT INTO Portfolio_Equipa (equipa_portfolioID,equipa_nome,equipa_email,equipa_telefone) VALUES (?,?,?,?)",
        [req.body.portfolioEquipaID, req.body.nome, req.body.email, req.body.nome]);
}

module.exports.insertIntoUtilizador = insertIntoUtilizador;
module.exports.insertIntoPortfolio = insertIntoPortfolio;
module.exports.insertIntoPrtfolioAreaCientifica = insertIntoPrtfolioAreaCientifica;
module.exports.insrtIntoPortfolioEquipa = insrtIntoPortfolioEquipa;