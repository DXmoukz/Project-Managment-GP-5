const executeSql = require("../querys/executeHandler");

function getUtilizadorFromEmailPassword(req, res) {
    executeSql("SELECT * FROM Utilizador WHERE utilizador_email = ? AND utilizador_password = ?", [req.body.email, req.body.password], function (rows) {
        res.send(rows);
    });
}

function getUtilizadorFromEmail(req, res) {
    executeSql("SELECT * FROM Utilizador WHERE utilizador_email = ?", [req.body.email], function (rows) {
        res.send(rows);
    });
}

function getUtilizadorFromID(req, res) {
    executeSql("SELECT * FROM Utilizador WHERE utilizador_id = ?", [req.body.utilizador], function (rows) {
        res.send(rows);
    });
}

function getUniversidade(req, res) {
    executeSql("SELECT * FROM `Universidades`", [], function (rows) {
        res.send(rows);
    });
}

function getCursos(req, res) {
    executeSql("SELECT * FROM `Cursos`", [], function (rows) {
        res.send(rows);
    });
}

function getAreaCientifica(req, res) {
    executeSql("SELECT * FROM `AreaCientifica`", [], function (rows) {
        res.send(rows);
    });
}

function getCursoID(req, res) {
    executeSql("SELECT * FROM Cursos where curso_nome = ?", [req.body.cur], function (rows) {
        res.send(rows);
    });
}

function getCursoNome(req, res) {
    executeSql("SELECT * FROM Cursos where curso_id = ?", [req.body.id], function (rows) {
        res.send(rows);
    });
}

function getUniversidadeID(req, res) {
    executeSql("SELECT * FROM Universidades where universidade_nome = ?", [req.body.uni], function (rows) {
        res.send(rows);
    });
}

function getUniversidadeNome(req, res) {
    executeSql("SELECT * FROM Universidades where universidade_id = ?", [req.body.id], function (rows) {
        res.send(rows);
    });
}

function getPortfolio(req, res) {
    executeSql("SELECT * FROM Portfolio where portfolio_nome = ?", [req.body.nome], function (rows) {
        res.send(rows);
    });
}

function getAreasFromPortfolio(req, res) {
    executeSql("SELECT area_nome FROM portfolios_areacientifica " +
        "join areacientifica on portfolioArea_areaID = area_id where portfolioArea_portfolioID = ?", [req.body.id],
        function (rows) {
            res.send(rows);
        });
}

function getEquipaFromPortfolio(req, res) {
    executeSql("SELECT equipa_nome, equipa_email, equipa_telefone FROM portfolio_equipa where equipa_portfolioID = ?", [req.body.id], function (rows) {
        res.send(rows);
    });
}

function getPortfolioFromUtilizadorID(req, res) {
    executeSql("SELECT * FROM Portfolio WHERE portfolio_utilizadorID = ? AND portfolio_nome = ?", [req.body.utilizadorID, req.body.titulo], function (rows) {
        res.send(rows);
    });
}

function getPortfoliosUtilizador(req, res) {
    executeSql("SELECT * FROM Portfolio where portfolio_utilizadorID = ? and portfolio_aceite != 'Rejeitado'",
        [req.body.id], function (rows) {
            res.send(rows);
        });
}

function getPortfoliosFromArea(req, res) {
    var sql = "SELECT portfolio_nome FROM Portfolio " +
        "join portfolios_areacientifica on portfolio_id = portfolios_areacientifica.portfolioArea_portfolioID " +
        "join areacientifica on portfolioArea_areaID = area_id " +
        "where areacientifica.area_nome in(";
    req.body.areas.forEach((element, index, array) => {
        sql += "'" + element + "'";
        if (index != array.length - 1) {
            sql += ",";
        }
    });
    sql += ") and portfolio_aceite='Aceite' group by portfolio_nome " +
        "having count(portfolio_nome) = ? order by portfolio_nome " + req.body.ordem;
    executeSql(sql, [req.body.areas.length], function (rows) {
        res.send(rows);
    });
}

function getPortfoliosNaoAceite(req, res) {
    executeSql("SELECT portfolio_id,portfolio_nome,utilizador_nome,porfolio_partilha,portfolio_aceite" +
        " FROM Portfolio " +
        "join Utilizador on portfolio_utilizadorID = utilizador_id " +
        " where portfolio_aceite='Em Analise' and utilizador_id != ?", [req.body.id],
        function (rows) {
            res.send(rows);
        });
}

function getPortfoliosAceite(req, res) {
    executeSql("SELECT portfolio_id,portfolio_nome,utilizador_nome,porfolio_partilha,portfolio_aceite" +
        " FROM Portfolio " +
        "join Utilizador on portfolio_utilizadorID = utilizador_id " +
        " where portfolio_aceite='Aceite' order by portfolio_nome " + req.body.ordem, [],
        function (rows) {
            res.send(rows);
        });
}

function getPortfoliosAceiteLike(req, res) {
    executeSql("SELECT portfolio_nome" +
        " FROM Portfolio " +
        " where portfolio_aceite='Aceite' and portfolio_nome LIKE '" + req.body.like +
        "%' order by portfolio_nome " + req.body.ordem,
        [], function (rows) {
            res.send(rows);
        });
}
function getUtilizadorFromPorfolioID(req, res) {
    executeSql("SELECT utilizador_nome,utilizador_email FROM Utilizador Join Portfolio on utilizador_id=portfolio_utilizadorID where portfolio_id=?",
        [req.body.portfolioID], function (rows) {
            res.send(rows);
        });
}

function getTotalPortfoliosPorUtilizador(req, res) {
    executeSql("SELECT count(portfolio_id) as total,utilizador_nome FROM Portfolio Join Utilizador on portfolio_utilizadorID=utilizador_id group by utilizador_id",
        [], function (rows) {
            res.send(rows);
        });
}

function getTotalPorfoliosAceites(req, res) {
    executeSql("SELECT count(portfolio_id) as total,portfolio_aceite FROM Portfolio where portfolio_aceite='Aceite'",
        [], function (rows) {
            res.send(rows);
        });
}
function getTotalPorfoliosRejeitados(req, res) {
    executeSql("SELECT count(portfolio_id) as total,portfolio_aceite FROM Portfolio where portfolio_aceite='Rejeitado'",
        [], function (rows) {
            res.send(rows);
        });
}

function getUtilizadores(req, res) {
    executeSql("SELECT utilizador_id,utilizador_nome,utilizador_datanascimento,utilizador_email,utilizador_isSuport FROM Utilizador",
        [], function (rows) {
            res.send(rows);
        });
}

function getPortfolioFromID(req, res) {
    executeSql("SELECT * FROM Portfolio where portfolio_id = ?", [req.body.portfolioID], function (rows) {
        res.send(rows);
    });
}

function getUtilizadoresNotSupport(req, res) {
    executeSql("SELECT * FROM Utilizador where utilizador_isSuport = 0",
        [], function (rows) {
            res.send(rows);
        });
}

function getUtilizadoresSupport(req, res) {
    executeSql("SELECT * FROM Utilizador where utilizador_isSuport = 1 and utilizador_alcunha != 'admin'",
        [], function (rows) {
            res.send(rows);
        });
}

module.exports.getUtilizadoresSupport = getUtilizadoresSupport;
module.exports.getUtilizadoresNotSupport = getUtilizadoresNotSupport;
module.exports.getPortfolioFromID = getPortfolioFromID;
module.exports.getUtilizadores = getUtilizadores;
module.exports.getTotalPorfoliosAceites = getTotalPorfoliosAceites;
module.exports.getTotalPorfoliosRejeitados = getTotalPorfoliosRejeitados;
module.exports.getTotalPortfoliosPorUtilizador = getTotalPortfoliosPorUtilizador;
module.exports.getUtilizadorFromPorfolioID = getUtilizadorFromPorfolioID;
module.exports.getPortfoliosFromArea = getPortfoliosFromArea;
module.exports.getPortfoliosUtilizador = getPortfoliosUtilizador;
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
module.exports.getPortfolioFromUtilizadorID = getPortfolioFromUtilizadorID;
module.exports.getPortfoliosNaoAceite = getPortfoliosNaoAceite;
module.exports.getPortfoliosAceite = getPortfoliosAceite;
module.exports.getPortfoliosAceiteLike = getPortfoliosAceiteLike;
module.exports.getUniversidadeNome = getUniversidadeNome;
module.exports.getCursoNome = getCursoNome;