window.onload = function (event) {
    lerPortfolio(JSON.parse(localStorage.getItem("portfolioToGO")).portfolio);
    regularCores();
}

function loadData(verb, url, dados, handler) {
    var xhr = new XMLHttpRequest();
    xhr.open(verb, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var responseText = JSON.parse(this.responseText);
            handler(responseText);
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
    loadData("POST", "/getPortfolio", data, function (dado1) {
        portfolio = {
            id: dado1[0].portfolio_id,
            nome: dado1[0].portfolio_nome,
            descricao: dado1[0].portfolio_descricao,
            motivacao: dado1[0].portfolio_motivacoes,
            utilizador: dado1[0].portfolio_utilizadorID,
            equipa: [],
            areas: []
        };
        loadData("POST", "/getAreasFromPortfolio", portfolio, function (dado2) {
            var controlo1 = false;
            var controlo2 = false;
            dado2.forEach(function (element) {
                controlo1 = true;
                areas.push(element.area_nome);
            });
            if (controlo1) {
                portfolio.areas = areas;
            }
            loadData("POST", "/getEquipaFromPortfolio", portfolio, function (dado3) {
                dado3.forEach(function (element) {
                    controlo2 = true;
                    equipa.push({ nome: element.equipa_nome, email: element.equipa_email, telefone: element.equipa_telefone });
                });
                if (controlo2) {
                    portfolio.equipa = equipa;
                }
                localStorage.setItem("portfolioShowing", JSON.stringify(portfolio));
                loadData("POST", "/getUtilizadorFromID", portfolio, function (dado4) {
                    preencherSobre(dado4[0].utilizador_alcunha, portfolio);
                    preencherContactos(dado4[0], portfolio);
                    getPortfolioFiles(dado4[0].utilizador_alcunha, portfolio);
                });
            });
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
    document.getElementById("Sobre_informacao").insertBefore(p_areas, document.getElementById("final"));
}

function preencherContactos(dados_utilizador, portfolio) {
    var p_nome = document.createElement("p");
    var p_contacto = document.createElement("p");
    var p_email = document.createElement("p");
    var div = document.createElement("div");
    p_nome.textContent = dados_utilizador.utilizador_nome;
    p_contacto.textContent = dados_utilizador.utilizador_telefone;
    p_email.textContent = dados_utilizador.utilizador_email;
    p_nome.id = "contactos_principal";
    div.appendChild(p_nome);
    p_contacto.id = "contactos_principal";
    div.appendChild(p_contacto);
    p_email.id = "contactos_principal_last";
    div.appendChild(p_email);
    var parent = document.getElementById("contactos_informacao");
    parent.insertBefore(div, document.getElementById("contactos_equipa"));
    //Adicionar Restante Equipa
    portfolio.equipa.forEach(function (elemento) {
        document.getElementById("contactos_equipa").style.display = "block";
        var campo_1 = document.createElement("p");
        var campo_2 = document.createElement("p");
        var campo_3 = document.createElement("p");
        var div2 = document.createElement("div");
        campo_1.textContent = elemento.nome;
        campo_2.textContent = elemento.telefone;
        campo_3.textContent = elemento.email;
        campo_1.id = "contactos_secundario";
        div2.appendChild(campo_1);
        campo_2.id = "contactos_secundario";
        div2.appendChild(campo_2);
        campo_3.id = "contactos_secundario_last";
        div2.appendChild(campo_3);
        parent.appendChild(div2);
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
    document.getElementById("final").title = "final.pdf";
    document.getElementById("final").href = "/Utilizadores/" + alcunha + "/" + portfolio.nome + "/documentos/final.pdf";
    document.getElementById("final").target = "Blank";
    getDocsPaths(caminho);
    getImagesPaths(caminho);
    addScriptsToHead();
    getVideosPaths(caminho);
    regularCores();
}

function getImagesPaths(caminho) {
    var dados = { caminho: caminho + "imagens/" };
    loadDocuments("POST", "/getPortfolioImages", dados, function (data) {
        if (data.length > 0) {
            document.getElementById("imagens").style.display = "block";
            document.getElementById("imagens").className = "impar";
            document.getElementById("items_nav_imagens").style.display = "inline-block";
        } else document.getElementById("imagens").className = "par";
        data.forEach(function (elemento) {
            var imagemCaminho = dados.caminho + elemento;
            construirImagem(imagemCaminho);
        });
    });
}

function getVideosPaths(caminho) {
    var dados = { caminho: caminho + "videos/" };
    loadDocuments("POST", "/getPortfolioVideos", dados, function (data) {
        if (data.length > 0) {
            document.getElementById("videos").style.display = "block";
            if (document.getElementById("imagens").className === "par") {
                document.getElementById("videos").className = "impar";
                document.getElementById("contactos").className = "par";
            } else {
                document.getElementById("videos").className = "par";
                document.getElementById("contactos").className = "impar";
            }
        }
        data.forEach((elemento, index, array) => {
            var videoCaminho = dados.caminho + elemento;
            construirVideo(videoCaminho, (index + 1));
        });
        addScriptVideo();
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

function construirVideo(caminho, index) {
    var div = document.getElementsByClassName("cont")[0];
    var divPrincipal = document.getElementById("videos");
    var divVideo = document.createElement("div");
    var video = document.createElement("video");
    var source = document.createElement("source");
    var ul = document.getElementById("lightgallery");
    var li = document.createElement("li");
    var a = document.createElement("a");
    var novoDiv = document.createElement("div");
    var img1 = document.createElement("img");
    var img2 = document.createElement("img");
    divVideo.style.display = "none";
    divVideo.id = "video" + index;
    video.className = "lg-video-object lg-html5";
    video.setAttribute("controls", "");
    video.preload = "none";
    source.src = caminho;
    source.type = "video/mp4";
    video.appendChild(source);
    video.appendChild(document.createTextNode("Your browser does not support HTML5 video."));
    divVideo.appendChild(video);
    divPrincipal.insertBefore(divVideo, div);
    li.className = "video";
    li.setAttribute("data-html", "#video" + index);
    a.href = "";
    img1.className = "img-responsive";
    img1.src = "/image/videoicon.jpg";
    novoDiv.className = "demo-gallery-poster";
    img2.src = "https://sachinchoolur.github.io/lightGallery/static/img/play-button.png";
    novoDiv.appendChild(img2);
    a.appendChild(img1);
    a.appendChild(novoDiv);
    li.appendChild(a);
    ul.appendChild(li);
}

function construirDoc(nome, caminho) {
    var div = document.createElement("div");
    var a = document.createElement("a");
    var img = document.createElement("img");
    img.id = "ficheiros";
    var extension = getFileExtension(nome);
    switch (extension) {
        case "doc":
        case "dotx":
        case "docx":
            img.src = "/image/word.png";
            a.href = caminho + nome;
            a.target = "Blank";
            break;
        case "xls":
        case "xlsx":
            img.src = "/image/excel.png";
            a.href = caminho + nome;
            a.target = "Blank";
            break;
        case "pdf":
            img.src = "/image/pdf.png";
            a.href = caminho + nome;
            a.target = "Blank";
            break;
        case "pptx":
        case "potx":
        case "ppt":
            img.src = "/image/ppt.png";
            a.href = caminho + nome;
            a.target = "Blank";
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

function addScriptVideo() {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = "$(document).ready(function () { $('#lightgallery').lightGallery();});";
    head.appendChild(script);
}

function regularCores() {
    if (document.getElementById("imagens").style.display === "block") {
        document.getElementById("imagens").className = "impar";
        if (document.getElementById("videos").style.display === "block") {
            document.getElementById("videos").className = "par";
            document.getElementById("contactos").className = "impar";
        }
    } else if (document.getElementById("videos").style.display === "block") {
        document.getElementById("videos").className = "impar";
        document.getElementById("contactos").className = "par";
    } else document.getElementById("contactos").className = "impar";
}