const mkdir = require('mkdirp');
const fs = require('fs');
const formidable = require('formidable');
var path = require("path");

function uploadDados(req, res) {
    var form = new formidable.IncomingForm();
    var caminhoImg = [];
    var caminhoDoc = [];
    var caminhoVideo = [];
    // para os nomes dos ficheiros
    var nomeDocupload = [];
    var nomeVideoupload = [];
    var nomeImagupload = [];
    //
    var fileName = "";
    var nomeUser = [];

    form.on('field', function (field, file) {
        nomeUser.push(file);
        console.log(file);
    });
    //criar logo as pastas

    form.on('file', function (field, file) {
        criarPastaPortfolio(nomeUser[0] + "/" + nomeUser[1] + "/Doc");
        criarPastaPortfolio(nomeUser[0] + "/" + nomeUser[1] + "/Video");
        criarPastaPortfolio(nomeUser[0] + "/" + nomeUser[1] + "/Image");
        if (field == "doctoupload" && file.size != 0) {          
            caminhoDoc.push(file.path);
            nomeDocupload.push(file.name);
        }
        if (field == "videotoupload" && file.size != 0) {
            caminhoVideo.push(file.path);
            nomeVideoupload.push(file.name);
        }
        if (field == "imagetoupload" && file.size != 0) {
            caminhoImg.push(file.path);
            nomeImagupload.push(file.name);
        }
    });
    form.parse(req, function (err, file) {
        if (caminhoDoc.length != 0 ||
            caminhoVideo.length != 0 ||
            caminhoImg.length != 0) {       
            for (let i = 0; i < caminhoDoc.length; i++) {
                var oldpath = caminhoDoc[i];
                var caminho = path.join(__dirname, '../')
                var newpath = caminho + 'www/Utilizadores/' + nomeUser[0] + '/' + nomeUser[1] + '/Doc/' + nomeDocupload[i];
                console.log(newpath);
                fs.rename(oldpath, newpath, function (err) {});
            }
            for (let i = 0; i < caminhoVideo.length; i++) {
                var caminho = path.join(__dirname, '../')
                var oldpath = caminhoVideo[i];
                var newpath = caminho + 'www/Utilizadores/' + nomeUser[0] + '/' + nomeUser[1] + '/Video/' + nomeVideoupload[i];
                fs.rename(oldpath, newpath, function (err) {});
            }
            for (let i = 0; i < caminhoImg.length; i++) {
                var caminho = path.join(__dirname, '../')
                var oldpath = caminhoImg[i];
                var newpath = caminho + 'www/Utilizadores/' + nomeUser[0] + '/' + nomeUser[1] + '/Image/' + nomeImagupload[i];
                fs.rename(oldpath, newpath, function (err) {});
            }
        }
    });
    res.send('home.html');
}

function criarPastaPortfolio(portfolio) {
    var caminho = path.join(__dirname, '../')
    if (!fs.existsSync(caminho + 'www/Utilizadores/' + portfolio)) {
        mkdir(caminho+'www/Utilizadores/' + portfolio, function (err) {
            if (err) console.error(err);
        });
    }
}
function criarPastaUtilizador(req, res) {
    var caminho = path.join(__dirname, '../')
    mkdir(caminho+'www/Utilizadores/' + req.body.alcunha, function (err) {
        if (err) console.error(err);
    });
}

module.exports.uploadDados = uploadDados;
module.exports.criarPastaUtilizador = criarPastaUtilizador;