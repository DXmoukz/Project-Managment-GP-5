window.onload = function (event) {
    lerPortfolio(JSON.parse(localStorage.getItem("portfolioToGO")).portfolio);
}

function loadData(verb, url, dados, handler) {
    var xhr = new XMLHttpRequest();
    xhr.open(verb, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var responseText = JSON.parse(this.responseText);
            responseText.forEach((element, index, array) => {
                if (index === array.length - 1) {
                    handler(element, true);
                } else handler(element, false);
            });
        }
    };
    if (dados) {
        xhr.send(JSON.stringify(dados));
    } else xhr.send();
}

function loadDocuments(verb, url, dados, handler) {
    var xhr = new XMLHttpRequest();
    xhr.open(verb, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var responseText = JSON.parse(this.responseText);
            handler(responseText);
        }
    };
    xhr.send(JSON.stringify(dados));
}

function lerPortfolio(nome) {
    var data = { nome: nome };
    var portfolio = {};
    var areas = [];
    var equipa = [];
    loadData("POST", "/getPortfolio", data, function (dado1, controlo1) {
        portfolio = {
            id: dado1.portfolio_id,
            nome: dado1.portfolio_nome,
            descricao: dado1.portfolio_descricao,
            motivacao: dado1.portfolio_motivacoes,
            utilizador: dado1.portfolio_utilizadorID,
            equipa: [],
            areas: []
        };
        loadData("POST", "/getAreasFromPortfolio", portfolio, function (dado2, controlo2) {
            areas.push(dado2.area_nome);
            if (controlo2) {
                portfolio.areas = areas;
                loadData("POST", "/getEquipaFromPortfolio", portfolio, function (dado3, controlo3) {
                    equipa.push({ nome: dado3.equipa_nome, email: dado3.equipa_email, telefone: dado3.equipa_telefone });
                    if (controlo3) {
                        portfolio.equipa = equipa;
                        localStorage.setItem("portfolioShowing", JSON.stringify(portfolio));
                        loadData("POST", "/getUtilizadorFromID", portfolio, function (dado4, controlo4) {
                            preencherSobre(dado4.utilizador_alcunha, portfolio);
                            preencherContactos(dado4, portfolio);
                            getPortfolioFiles(dado4.utilizador_alcunha, portfolio);
                        });
                    }
                });
            }
        });
    });
}

function preencherSobre(alcunha, portfolio) {
    document.getElementById("nome").textContent = alcunha;
    document.getElementById("descricao").textContent = portfolio.descricao;
    document.getElementById("Sobre_descricao").textContent = portfolio.descricao;
    var p_descricao = document.createElement("p");
    p_descricao.textContent = portfolio.motivacao;
    p_descricao.id = "Sobre_motivacao";
    document.getElementById("Sobre_informacao").insertBefore(p_descricao, document.getElementById("Sobre_areas"));
    var p_areas = document.createElement("p");
    p_areas.id = "Sobre_lista";
    p_areas.textContent = transformarArrayEmString(portfolio.areas);
    document.getElementById("Sobre_informacao").insertBefore(p_areas, document.getElementById("pdf_principal"));
}

function preencherContactos(dados_utilizador, portfolio) {
    var p_nome = document.createElement("p");
    var p_contacto = document.createElement("p");
    var p_email = document.createElement("p");
    p_nome.textContent = dados_utilizador.utilizador_nome;
    p_contacto.textContent = dados_utilizador.utilizador_telefone;
    p_email.textContent = dados_utilizador.utilizador_email;
    p_nome.id = "contactos_principal";
    p_contacto.id = "contactos_principal";
    p_email.id = "contactos_principal";
    var parent = document.getElementById("contactos_informacao");
    parent.insertBefore(p_nome, document.getElementById("contactos_equipa"));
    parent.insertBefore(p_contacto, document.getElementById("contactos_equipa"));
    parent.insertBefore(p_email, document.getElementById("contactos_equipa"));
    //Adicionar Restante Equipa
    portfolio.equipa.forEach(function (elemento) {
        document.getElementById("contactos_equipa").style.display = "block";
        var campo_1 = document.createElement("p");
        var campo_2 = document.createElement("p");
        var campo_3 = document.createElement("p");
        campo_1.textContent = elemento.nome;
        campo_2.textContent = elemento.telefone;
        campo_3.textContent = elemento.email;
        campo_1.id = "contactos_secundario";
        campo_2.id = "contactos_secundario";
        campo_3.id = "contactos_secundario";
        parent.appendChild(campo_1);
        parent.appendChild(campo_2);
        parent.appendChild(campo_3);
    });
}

function transformarArrayEmString(objeto) {
    var frase = "";
    for (var i = 0; i < objeto.length; i++) {
        if (i > 0) {
            frase += ", ";
        }
        frase += objeto[i];
    }
    return frase;
}

function getPortfolioFiles(alcunha, portfolio) {
    var caminho = "/Utilizadores/" + alcunha + "/" + portfolio.nome + "/";
    getImagesPaths(caminho);
    addScriptsToHead();
    //getVideosPaths(caminho);
    getDocsPaths(caminho);
}

function getImagesPaths(caminho) {
    var dados = { caminho: caminho + "imagens/" };
    loadDocuments("POST", "/getPortfolioImages", dados, function (data) {
        if (data.length > 0) {
            document.getElementById("imagens").style.display = "block";
            document.getElementById("items_nav_imagens").style.display = "inline-block";
        }
        data.forEach(function (elemento) {
            var imagemCaminho = dados.caminho + elemento;
            construirImagem(imagemCaminho);
        });
    });
}

function getVideosPaths(nome) {
    var dados = { caminho: caminho + "videos/" };
    loadDocuments("POST", "/getPortfolioVideos", dados, function (data) {
        data.forEach(function (elemento) {

        });
    });
}

function getDocsPaths(caminho) {
    var dados = { caminho: caminho + "documentos/" };
    loadDocuments("POST", "/getPortfolioDocs", dados, function (data) {
        data.forEach(function (elemento) {
            construirDoc(elemento, dados.caminho);
        });
    });
}

function construirImagem(caminho) {
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.id = "img";
    img.src = caminho;
    li.appendChild(img);
    document.getElementsByClassName("jcarousel")[0].children[0].appendChild(li);
}

function construirVideo(caminho) {

}

function construirDoc(nome, caminho) {
    var div = document.createElement("div");
    var a = document.createElement("a");
    var img = document.createElement("img");
    img.id = "ficheiros";
    var extension = getFileExtension(nome);
    switch (extension) {
        case "doc":
        case "docx":
            img.src = "/image/word.png";
            //a.href = "https://view.officeapps.live.com/op/embed.aspx?src=";
            //a.target = "Blank";
            break;
        case "xls":
        case "xlsx":
            img.src = "/image/excel.png";
            //a.href = "https://view.officeapps.live.com/op/embed.aspx?src=";
            //a.target = "Blank";
            break;
        case "pdf":
            img.src = "/image/pdf.png";
            a.href = caminho + nome;
            a.target = "Blank";
            break;
        case "pptx":
        case "ppt":
            img.src = "/image/ppt.png";
            //a.href = "https://view.officeapps.live.com/op/embed.aspx?src=";
            //a.target = "Blank";
            break;
    }
    a.title = nome;
    a.appendChild(img);
    div.appendChild(a);
    document.getElementById("scroll").appendChild(div);
}

function addScriptsToHead() {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    var script2 = document.createElement('script');
    var script3 = document.createElement('script');
    script.type = 'text/javascript';
    script2.type = 'text/javascript';
    script3.type = 'text/javascript';
    script.src = '/Assets/jcarousel-0.3.7/vendor/jquery/jquery.js';
    script2.src = "/Assets/jcarousel-0.3.7/dist/jquery.jcarousel.min.js";
    script3.src = "/Assets/jcarousel-0.3.7/examples/basic/jcarousel.basic.js";
    head.appendChild(script);
    head.appendChild(script2);
    head.appendChild(script3);
}

function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

function regularCoresSeccoes() {
    console.log(document.getElementById("imagens").style.display);
    if (document.getElementById("imagens").style.display !== "none") {
        document.getElementById("imagens").className = "impar";
        if (document.getElementById("videos").style.display === "block") {
            document.getElementById("videos").className = "par";
        } else if (document.getElementById("contactos").style.display === "block") {
            document.getElementById("contactos").className = "par";
        }
    } else if (document.getElementById("videos").style.display !== "none") {
        document.getElementById("videos").className = "impar";
        if (document.getElementById("contactos").style.display === "block") {
            document.getElementById("contactos").className = "par";
        }
    } else if (document.getElementById("contactos").style.display !== "none") {
        document.getElementById("contactos").className = "par";
    }
}