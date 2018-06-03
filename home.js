var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var insertHandler = require('./script/querys/insertHandler');
var selectHandler = require('./script/querys/selectHandler');
var updateHandler = require('./script/querys/updateHandler');
var readFiles = require('./script/readFiles.js');
var uploadFile = require('./script/uploadFile');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("www"));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/www/template.html'));
});
//INSERTS-POST
app.post('/insertIntoUtilizador', insertHandler.insertIntoUtilizador);
app.post('/insertIntoPortfolio',insertHandler.insertIntoPortfolio);
app.post('/insertIntoPrtfolioAreaCientifica',insertHandler.insertIntoPrtfolioAreaCientifica);
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
app.post('/uploadDados',uploadFile.uploadDados);
app.post('/criarPastaUtilizador', uploadFile.criarPastaUtilizador);
//---SEbas
app.post('/getPortfolioFromUtilizadorID',selectHandler.getPortfolioFromUtilizadorID);
//---daniel
app.post('/getPortfoliosUtilizador', selectHandler.getPortfoliosUtilizador);
app.post('/getPortfoliosFromArea', selectHandler.getPortfoliosFromArea);
app.post('/getPortfolios', selectHandler.getPortfolios);
//UPDATE-POST
app.put('/editarUtilizador', updateHandler.editarUtilizador);
app.put('/updatePassword', updateHandler.updatePassword);
//SELECT-GET
app.get('/getUniversidade', selectHandler.getUniversidade);
app.get('/getCursos', selectHandler.getCursos);
app.get('/getAreaCientifica', selectHandler.getAreaCientifica);


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at port", port)
});


