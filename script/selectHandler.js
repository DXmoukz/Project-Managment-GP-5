const executeSql = require("../script/executeHandler");

function getUtilizadorFromEmailPassword(req, res) {
    executeSql("SELECT * FROM Utilizador WHERE utilizador_email = ? AND utilizador_password = ?",
     [req.body.email, req.body.password],function (rows) {
       res.send(rows);    
    });
}

function getUtilizadorFromEmail(req, res) {
    executeSql("SELECT * FROM Utilizador WHERE utilizador_email = ?",
     [req.body.email],function (rows) {
       res.send(rows);    
    });
}

function getUniversidade(req,res){
    executeSql("SELECT * FROM Universidades",
    [],function (rows) {
      res.send(rows);    
   });
}
function getCursos(req,res){
    executeSql("SELECT * FROM Cursos",
    [],function (rows) {
      res.send(rows);    
   });
}

function getAreaCientifica(req,res){
    executeSql("SELECT * FROM AreaCientifica",
    [],function (rows) {
      res.send(rows);    
   });
}

function getCursoID(req,res){
    executeSql("SELECT * FROM Cursos where curso_nome = ?",
    [req.body.cur],function (rows) {
      res.send(rows);    
   });
}

function getUniversidadeID(req,res){
    executeSql("SELECT * FROM Universidades where universidade_nome = ?",
    [req.body.uni],function (rows) {
      res.send(rows);    
   });
}

module.exports.getUniversidadeID = getUniversidadeID;
module.exports.getCursoID = getCursoID;
module.exports.getUtilizadorFromEmail=getUtilizadorFromEmail;
module.exports.getUtilizadorFromEmailPassword=getUtilizadorFromEmailPassword;
module.exports.getUniversidade=getUniversidade;
module.exports.getCursos=getCursos;
module.exports.getAreaCientifica=getAreaCientifica;
