const executeSql = require("../querys/executeHandler");
const executeSql2 = require("../querys/executeTESTE");
/**
 * Função para receber os dados de um novo utilizador atraves do post da pagina registo
 */

function insertIntoUtilizador(req, res) {
    executeSql("INSERT INTO Utilizador (utilizador_nome,utilizador_alcunha,utilizador_email,utilizador_telefone,utilizador_datanascimento,utilizador_password,utilizador_isSuport) VALUES (?,?,?,?,?,?,?)", 
    [req.body.nome, req.body.alcunha, req.body.email,req.body.telefone,req.body.dataNascimeto, req.body.password, req.body.isSuport]);
}

function insertIntoPortfolio(req, res) {    
    executeSql2("INSERT INTO Portfolio (portfolio_nome,portfolio_descricao,portfolio_motivacoes,portfolio_utilizadorID,porfolio_partilha) VALUES (?,?,?,?,?)", 
    [req.body.nome, req.body.descricao, req.body.motivacao, req.body.utilizadorID, req.body.partilha]);
}
function insertIntoPrtfolioAreaCientifica(req, res) {
    executeSql2("INSERT INTO Portfolios_AreaCientifica (portfolioArea_portfolioID,portfolioArea_areaID) VALUES (?,?)", 
    [req.body.portfolioID, req.body.areaID]);
}


module.exports.insertIntoUtilizador = insertIntoUtilizador;
module.exports.insertIntoPortfolio = insertIntoPortfolio;
module.exports.insertIntoPrtfolioAreaCientifica=insertIntoPrtfolioAreaCientifica;