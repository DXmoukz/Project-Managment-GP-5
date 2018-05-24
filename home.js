var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');

var insertHandler=require('./script/insertHandler');
var selectHandler=require('./script/selectHandler');

var updateHandler=require('./script/updateHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("www"));
//------
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/www/home.html'));
});
//INSERTS-POST
app.post('/insertIntoUtilizador', insertHandler.insertIntoUtilizador);
//SELECT-POST
app.post('/getUtilizadorFromEmail', selectHandler.getUtilizadorFromEmail);
app.post('/getUtilizadorFromEmailPassword', selectHandler.getUtilizadorFromEmailPassword);
app.post('/getCursoID', selectHandler.getCursoID);
app.post('/getUniversidadeID', selectHandler.getUniversidadeID);
//UPDATE-POST
app.put('/editarUtilizador',updateHandler.editarUtilizador);
app.put('/updatePassword',updateHandler.updatePassword);
//SELECT-GET
app.get('/getUniversidade',selectHandler.getUniversidade);
app.get('/getCursos',selectHandler.getCursos);
app.get('/getAreaCientifica',selectHandler.getAreaCientifica);

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});


