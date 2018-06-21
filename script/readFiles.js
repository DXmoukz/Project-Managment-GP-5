const fs = require('fs');

function getPortfolioDocs(req, res) {
    getFicheiros(req, res);
}

function getPortfolioVideos(req, res) {
    getFicheiros(req, res);
}

function getPortfolioImages(req, res) {
    getFicheiros(req, res);
}

function getFicheiros(req, res){
    var ficheiros = []
    fs.readdirSync("./www" +req.body.caminho).forEach(file => {
        ficheiros.push(file);
    })
    res.send(ficheiros);
}


module.exports.getPortfolioImages = getPortfolioImages;
module.exports.getPortfolioVideos = getPortfolioVideos;
module.exports.getPortfolioDocs = getPortfolioDocs;