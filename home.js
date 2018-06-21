var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var insertHandler = require('./script/querys/insertHandler');
var selectHandler = require('./script/querys/selectHandler');
var updateHandler = require('./script/querys/updateHandler');
var readFiles = require('./script/readFiles.js');
var uploadFile = require('./script/uploadFile');

app.use(express.static(__dirname + "/www"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    res.render("index");
});
//INSERTS-POST
app.post('/insertIntoUtilizador', insertHandler.insertIntoUtilizador);
app.post('/insertIntoPortfolio', insertHandler.insertIntoPortfolio);
app.post('/insertIntoPrtfolioAreaCientifica', insertHandler.insertIntoPrtfolioAreaCientifica);
app.post('/insrtIntoPortfolioEquipa', insertHandler.insrtIntoPortfolioEquipa);
//SELECT-POST
app.post('/getUtilizadorFromEmail', selectHandler.getUtilizadorFromEmail);
app.post('/getUtilizadorFromEmailPassword', selectHandler.getUtilizadorFromEmailPassword);
app.post('/getCursoID', selectHandler.getCursoID);
app.post('/getUniversidadeID', selectHandler.getUniversidadeID);
app.post('/getPortfolio', selectHandler.getPortfolio);
app.post('/getPortfolioImages', readFiles.getPortfolioImages);
app.post('/getPortfolioVideos', readFiles.getPortfolioVideos);
app.post('/getPortfolioDocs', readFiles.getPortfolioDocs);
app.post('/getUtilizadorFromID', selectHandler.getUtilizadorFromID);
app.post('/getEquipaFromPortfolio', selectHandler.getEquipaFromPortfolio);
app.post('/getAreasFromPortfolio', selectHandler.getAreasFromPortfolio);
app.post('/uploadDados', uploadFile.uploadDados);
app.post('/criarPastaUtilizador', uploadFile.criarPastaUtilizador);
app.post('/getPortfolioFromUtilizadorID', selectHandler.getPortfolioFromUtilizadorID);
app.post('/getPortfoliosUtilizador', selectHandler.getPortfoliosUtilizador);
app.post('/getPortfoliosFromArea', selectHandler.getPortfoliosFromArea);
app.post('/getPortfoliosNaoAceite', selectHandler.getPortfoliosNaoAceite);
app.post('/getPortfoliosAceite', selectHandler.getPortfoliosAceite);
app.post('/getPortfoliosAceiteLike', selectHandler.getPortfoliosAceiteLike);
app.post('/getUtilizadorFromPorfolioID', selectHandler.getUtilizadorFromPorfolioID);
app.post('/getPortfolioFromID', selectHandler.getPortfolioFromID);
app.post('/getUtilizadoresSupport', selectHandler.getUtilizadoresSupport);
app.post('/getUtilizadoresNotSupport', selectHandler.getUtilizadoresNotSupport);
app.post('/getCursoNome', selectHandler.getCursoNome);
app.post('/getUniversidadeNome', selectHandler.getUniversidadeNome);

app.put('/updateUserIsSuport', updateHandler.updateUserIsSuport);
//UPDATE-POST
app.put('/editarUtilizador', updateHandler.editarUtilizador);
app.put('/updatePassword', updateHandler.updatePassword);
app.put('/updatePortfolio', updateHandler.updatePortfolio);
app.put('/enviarEmail', uploadFile.enviarEmail);
//SELECT-GET
app.get('/getUniversidade', selectHandler.getUniversidade);
app.get('/getCursos', selectHandler.getCursos);
app.get('/getAreaCientifica', selectHandler.getAreaCientifica);
app.get('/getTotalPortfoliosPorUtilizador', selectHandler.getTotalPortfoliosPorUtilizador);
app.get('/getTotalPorfoliosAceites', selectHandler.getTotalPorfoliosAceites);
app.get('/getTotalPorfoliosRejeitados', selectHandler.getTotalPorfoliosRejeitados);
app.get('/getUtilizadores', selectHandler.getUtilizadores);

port = process.env.PORT || 8081;

app.listen(port, function () {
    console.log("App running");
});

/*
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at port", port)
});*/


