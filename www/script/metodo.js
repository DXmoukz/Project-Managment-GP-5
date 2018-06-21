// LOADS
window.onload = function (event) {
    if (window.location.pathname === "/index.html" ||
        window.location.pathname === "/") {
        adicionar();
        verificarLogin();
    } else if (window.location.pathname === "/portfoliosUtilizador.html") {
        document.getElementById("imagem_utilizador_perfil").src = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
        getPortfoliosUtilizador();
    } else if (window.location.pathname === "/procurarPortfolios.html") {
        preencherPesquisaAreas();
        showResultsSearch();
    } else if (window.location.pathname === "/portfoliosEditarLista.html") {
        document.getElementById("imagem_utilizador_perfil").src = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
        getPortfoliosUtilizadorEditar();
    } else if (window.location.pathname === "/criarPortfolio.html") {
        document.getElementById("imagem_utilizador_perfil").src = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
        preencherSelectAreaCientifica("campo_selectArea");
    } else if (window.location.pathname === "/portfoliosSubmetidos.html") {
        document.getElementById("imagem_utilizador_perfil").src = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
        getPortfoliosNaoAceiteBD();
    } else if (window.location.pathname === "/perfil.html") {
        document.getElementById("imagem_utilizador_perfil").src = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
        checkSuport();
    } else if (window.location.pathname === "/perfilAdmin.html" ||
        window.location.pathname === "/portfolios.html") {
        document.getElementById("imagem_utilizador_perfil").src = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
    } else if (window.location.pathname === "/perfilUtilizador.html") {
        var a = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("imagem_utilizador_perfil").src = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("imagem_utilizador_perfil2").src = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
        document.getElementById("utilizador_nome2").text = JSON.parse(localStorage.getItem("user")).alcunha;
        document.getElementById("espaco_nome").innerHTML = JSON.parse(localStorage.getItem("user")).nome;
        document.getElementById("espaco_email").innerHTML = JSON.parse(localStorage.getItem("user")).email;
        document.getElementById("espaco_data").innerHTML = JSON.parse(localStorage.getItem("user")).dataNascimeto;
        var cursos = JSON.parse(localStorage.getItem("cursos"));
        var universidades = JSON.parse(localStorage.getItem("universidades"));
        if (JSON.parse(localStorage.getItem("user")).cursoID) {
            var aux = {
                id: JSON.parse(localStorage.getItem("user")).cursoID
            }
            loadData("POST", "/getCursoNome", aux, function (dado) {
                document.getElementById("espaco_curso").innerHTML = cursos[cursos.indexOf(dado[0].curso_nome)];
            });
        } else document.getElementById("espaco_curso").innerHTML = cursos[0];
        if (JSON.parse(localStorage.getItem("user")).universidadeID) {
            var aux2 = {
                id: JSON.parse(localStorage.getItem("user")).universidadeID
            }
            loadData("POST", "/getUniversidadeNome", aux2, function (dado) {
                document.getElementById("espaco_universidade").innerHTML = universidades[universidades.indexOf(dado[0].universidade_nome)];
            });
        } else document.getElementById("espaco_universidade").innerHTML = universidades[0];
    } else if (window.location.pathname === "/editar.html") {
        document.getElementById("imagem_utilizador_perfil").src = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("imagem_utilizador_perfil2").src = JSON.parse(localStorage.getItem("imagem"));
    } else if (window.location.pathname === "/analisarPortfolio.html") {
        document.getElementById("imagem_utilizador_perfil").src = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
        criarFormAnalisarPortfolio();
    } else if (window.location.pathname === "/utilizadorToSupport.html") {
        document.getElementById("imagem_utilizador_perfil").src = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
        carregarUtilizadoresSupport();
    } else if (window.location.pathname === "/servicos.html" ||
        window.location.pathname === "/contactos.html" ||
        window.location.pathname === "/estatisticas.html") {
        verificarLogin();
    } else if(window.location.pathname === "/editarPortfolio.html"){
        document.getElementById("imagem_utilizador_perfil").src = JSON.parse(localStorage.getItem("imagem"));
        document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
        preencherSelectAreaCientifica("campo_editArea");
    }
}

class Utilizador {
    constructor(alcunha, nome, data, email, telefone, password, universidade, curso, suporte) {
        this.nome = nome;
        this.email = email;
        this.alcunha = alcunha;
        this.telefone = telefone;
        this.dataNascimeto = data;
        this.password = password;
        this.isSuport = suporte;
        this.universidadeID = universidade;
        this.cursoID = curso;
        this.userID = null;
    }
    setID(_id) {
        this.userID = _id;
    }
    getID() {
        return this.userID;
    }
}

class Portfolio {
    constructor(nome, descricao, motivacao, utilizadorID, partilha, aceite) {
        this.nome = nome;
        this.descricao = descricao;
        this.motivacao = motivacao;
        this.utilizadorID = utilizadorID;
        this.partilha = partilha;
        this.portfolioID = null;
        this.portfolioAceite = aceite;
    }
    setID(id) {
        this.portfolioID = id;
    }
    getID() {
        return this.portfolioID;
    }
    setPortfolioAceite(aceite) {
        this.portfolioAceite = aceite;
    }
    getPortfolioAceite() {
        return this.portfolioAceite;
    }
}

class PortfolioNaoAceite {
    constructor(tituloPortfolio, nomeProprietario, tipoPartilha, estado) {
        this.tituloPortfolio = tituloPortfolio;
        this.nomeProprietario = nomeProprietario;
        this.tipoPartilha = tipoPartilha;
        this.estado = estado;
    }
}

class Portfolio_AreaCientifica {
    constructor(portfolioID, areaID) {
        this.portfolioID = portfolioID;
        this.areaID = areaID;
    }
}

class Portfolio_Equipa {
    constructor(id, nome, email, telefone) {
        this.portfolioEquipaID = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}

class TotalPortfoliosGrafico {
    constructor(total, estado) {
        this.total = total;
        this.estado = estado;
    }
}

function insertUpdateDelete(verb, url, dados, handler) {
    var xhr = new XMLHttpRequest();
    xhr.open(verb, url, true); //true assincrono
    xhr.setRequestHeader("Content-Type", "application/json"); //definir o pedido
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            if (handler) {
                handler();
            }
        }
    };
    xhr.send(JSON.stringify(dados));
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

function registoUtilizador() {
    document.getElementById("registoFalhado").textContent = "";
    const nome = document.getElementById("campo_nome").value;
    const email = document.getElementById("campo_email").value;
    const telefone = document.getElementById("campo_telefone").value;
    const alcunha = document.getElementById("campo_alcunha").value;
    const dataNasc = document.getElementById("campo_data").value;
    const password = document.getElementById("campo_password").value;
    const password2 = document.getElementById("campo_password2").value;
    if (nome != "" && email != "" && telefone != "" && alcunha != "" && dataNasc != "" &&
        password != "" && password2 != "") {
        if (password != password2) {
            document.getElementById("registoFalhado").style.color = 'red';
            document.getElementById("registoFalhado").textContent = "Passwords nao coincidem...";
        } else {
            var utilizador = new Utilizador(alcunha, nome, dataNasc, email, telefone, password, 1, 1, 0);
            insertUpdateDelete("POST", "/insertIntoUtilizador", utilizador);
            insertUpdateDelete("POST", "/criarPastaUtilizador", utilizador);
            insertUpdateDelete("POST", "/enviarEmail", utilizador);
            window.location.replace("contaCriada.html");
        }
    } else {
        document.getElementById("registoFalhado").style.color = 'red';
        document.getElementById("registoFalhado").textContent = "Preencha todos os campos";
    }
}

function loginUtilizador() {
    document.getElementById("loginFalhado").textContent = "";
    const email = document.getElementById("campo_email").value;
    const password = document.getElementById("campo_password").value;
    var data = {
        email: email,
        password: password
    };
    loadData("POST", "/getUtilizadorFromEmailPassword", data, function (dados) {
        var utilizador = dados[0];
        if (utilizador) {
            if (email == utilizador.utilizador_email && password == utilizador.utilizador_password) {
                var user = new Utilizador(
                    utilizador.utilizador_alcunha,
                    utilizador.utilizador_nome,
                    utilizador.utilizador_datanascimento.slice(0, 10),
                    utilizador.utilizador_email,
                    utilizador.utilizador_telefone,
                    utilizador.utilizador_password,
                    utilizador.utilizador_universidadeID,
                    utilizador.utilizador_cursoID,
                    utilizador.utilizador_isSuport
                );
                user.setID(utilizador.utilizador_id);
                localStorage.setItem("user", JSON.stringify(user));
                getImageUser();
                window.location.replace("index.html");
            } else {
                document.getElementById("loginFalhado").style.color = 'red';
                document.getElementById("loginFalhado").textContent = "Email ou Passwords invalidas";
            }
        } else {
            document.getElementById("loginFalhado").style.color = 'red';
            document.getElementById("loginFalhado").textContent = "Utilizador não existe";
        }
    });
}

function apagar() {
    localStorage.removeItem("user");
    localStorage.removeItem("portfolio");
    localStorage.removeItem("imagem");
    window.location.replace("index.html");
}

function mostrarPerfil() {
    if (JSON.parse(localStorage.getItem("user")).alcunha != "admin") {
        window.location.replace("perfil.html");
    } else window.location.replace("perfilAdmin.html");
}

function alteracaoPassword() {
    document.getElementById("inicial").style.display = "none";
    document.getElementById("alteracao_password").style.display = "block";
    document.getElementById("cmp_password_confirm").value = "";
    document.getElementById("cmp_password_new").value = "";
    document.getElementById("cmp_password_old").value = "";
    document.getElementById("erroPassword").textContent = "";
}

function alteracaoDadosPessoais() {
    document.getElementById("inicial").style.display = "none";
    document.getElementById("alteracao_dados_pessoais").style.display = "block";
    document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
    document.getElementById("utilizador_nome2").text = JSON.parse(localStorage.getItem("user")).alcunha;
    document.getElementById("editar_nome").value = JSON.parse(localStorage.getItem("user")).nome;
    document.getElementById("editar_data").value = JSON.parse(localStorage.getItem("user")).dataNascimeto;
    preencherSelectUniversidades("editar_universidade");
    preencherSelectCursos("editar_curso");
    var cursos = JSON.parse(localStorage.getItem("cursos"));
    var universidades = JSON.parse(localStorage.getItem("universidades"));
    if (JSON.parse(localStorage.getItem("user")).cursoID) {
        var aux = {
            id: JSON.parse(localStorage.getItem("user")).cursoID
        }
        loadData("POST", "/getCursoNome", aux, function (dado) {
            document.getElementById("editar_curso").value = cursos[cursos.indexOf(dado[0].curso_nome)];
        });
    } else document.getElementById("editar_curso").value = cursos[0];
    if (JSON.parse(localStorage.getItem("user")).universidadeID) {
        var aux2 = {
            id: JSON.parse(localStorage.getItem("user")).universidadeID
        }
        loadData("POST", "/getUniversidadeNome", aux2, function (dado) {
            document.getElementById("editar_universidade").value = universidades[universidades.indexOf(dado[0].universidade_nome)];
        });
    } else document.getElementById("editar_universidade").value = universidades[0];
}

function confirmarPassword() {
    const pass_antiga = document.getElementById("cmp_password_old").value;
    const pass_nova = document.getElementById("cmp_password_new").value;
    const pass_confirmacao = document.getElementById("cmp_password_confirm").value;
    var erro = document.getElementById("erroPassword");
    erro.textContent = "";
    if ((pass_antiga && pass_antiga.length > 0) && (pass_nova && pass_nova.length > 0) &&
        (pass_confirmacao && pass_confirmacao.length > 0)) {
        var data = {
            password: pass_antiga,
            email: JSON.parse(localStorage.getItem("user")).email
        };
        loadData("POST", "/getUtilizadorFromEmailPassword", data, function (dados) {
            var utilizador = dados[0];
            if (utilizador) {
                alert(utilizador.utilizador_password);
                if (passAntigaCorreta) {
                    if (pass_nova === pass_confirmacao) {
                        data = {
                            password: pass_nova,
                            email: JSON.parse(localStorage.getItem("user")).email
                        };
                        insertUpdateDelete("PUT", "/updatePassword", data);
                        window.location.replace("perfilUtilizador.html");
                    } else erro.textContent = "Passwords não são iguais";
                }
            } else erro.textContent = "Password Antiga não coincide";
        });
    } else erro.textContent = "Preencha todos os campos";
}

function cancelarPassword() {
    document.getElementById("alteracao_password").style.display = "none";
    document.getElementById("inicial").style.display = "block";
}

function confirmarDadosPessoais() {
    const nomeGet = document.getElementById("editar_nome").value;
    const dataNascGet = document.getElementById("editar_data").value;
    const universidadeGet = document.getElementById("editar_universidade").value;
    const cursoGet = document.getElementById("editar_curso").value;
    var erro = document.getElementById("erroPerfil");
    erro.textContent = "";
    var uniID = null;
    var cursoID = null;
    if ((nomeGet && nomeGet.length > 0) && (dataNascGet && dataNascGet.length > 0) &&
        universidadeGet != "Não Definido" && cursoGet != "Não Definido") {
        var aux = {
            uni: universidadeGet
        };
        loadData("POST", "/getUniversidadeID", aux, function (dado) {
            uniID = dado[0].universidade_id;
            var aux2 = {
                cur: cursoGet
            };
            loadData("POST", "/getCursoID", aux2, function (dado) {
                cursoID = dado[0].curso_id;
                var dados = {
                    nome: nomeGet,
                    data: dataNascGet,
                    universidade: uniID,
                    curso: cursoID,
                    alcunha: JSON.parse(localStorage.getItem("user")).alcunha
                }
                insertUpdateDelete("PUT", "/editarUtilizador", dados, function () {
                    var dat = {
                        email: JSON.parse(localStorage.getItem("user")).email
                    };
                    loadData("POST", "/getUtilizadorFromEmail", dat, function (dado) {
                        var utilizador = dado[0];
                        if (utilizador) {
                            var user = new Utilizador(
                                utilizador.utilizador_alcunha,
                                utilizador.utilizador_nome,
                                utilizador.utilizador_datanascimento.slice(0, 10),
                                utilizador.utilizador_email,
                                utilizador.utilizador_telefone,
                                utilizador.utilizador_password,
                                utilizador.utilizador_universidadeID,
                                utilizador.utilizador_cursoID,
                                utilizador.utilizador_isSuport
                            );
                            localStorage.setItem("user", JSON.stringify(user));
                            window.location.replace("perfilUtilizador.html");
                        }
                    });
                });
            });
        });
    } else erro.textContent = "Preencha todos os campos";
}

function cancelarDadosPessoais() {
    document.getElementById("alteracao_dados_pessoais").style.display = "none";
    document.getElementById("inicial").style.display = "block";
}

function adicionarUniversidades() {
    universidades = [];
    loadData("GET", '/getUniversidade', null, function (dados) {
        dados.forEach((element, index, array) => {
            universidades.push(element.universidade_nome);
            if (index === array.length - 1) {
                localStorage.setItem("universidades", JSON.stringify(universidades));
            }
        });
    });
}

function adicionarCurso() {
    cursos = [];
    loadData("GET", '/getCursos', null, function (dados) {
        dados.forEach((element, index, array) => {
            cursos.push(element.curso_nome);
            if (index === array.length - 1) {
                localStorage.setItem("cursos", JSON.stringify(cursos));
            }
        });
    });
}

function adicionarAreaCientifica() {
    areasCientificas = [];
    loadData("GET", '/getAreaCientifica', null, function (dados) {
        dados.forEach((element, index, array) => {
            areasCientificas.push(element.area_nome);
            if (index === array.length - 1) {
                localStorage.setItem("areas", JSON.stringify(areasCientificas));
            }
        });
    });
}

function adicionar() {
    adicionarUniversidades();
    adicionarCurso();
    adicionarAreaCientifica();
    getTotalPorfoliosAceites();
    getTotalPorfoliosRejeitados();
}

function preencherSelectCursos(elemento) {
    removeChildsSelect(document.getElementById(elemento));
    var x = document.getElementById(elemento);
    JSON.parse(localStorage.getItem("cursos")).forEach(function (dado) {
        var option = document.createElement("option");
        option.text = dado;
        x.add(option);
    });
}

function preencherSelectAreaCientifica(elemento) {
    removeChildsSelect(document.getElementById(elemento));
    var x = document.getElementById(elemento);
    var c = 0;
    JSON.parse(localStorage.getItem("areas")).forEach(function (dado) {
        c++;
        var option = document.createElement("option");
        option.text = dado;
        option.value = c;
        x.add(option);
    });
}

function preencherSelectUniversidades(elemento) {
    var x = document.getElementById(elemento);
    removeChildsSelect(document.getElementById(elemento));
    JSON.parse(localStorage.getItem("universidades")).forEach(function (dado) {
        var option = document.createElement("option");
        option.text = dado;
        x.add(option);
    });
}

function getImageUser() {
    if (JSON.parse(localStorage.getItem("user")).alcunha != "admin") {
        var dados = {
            caminho: "/Utilizadores/" + JSON.parse(localStorage.getItem("user")).alcunha + "/foto/"
        };
        loadDocuments("POST", "/getPortfolioImages", dados, function (data) {
            if (data.length > 0) {
                var caminho = "/Utilizadores/" + JSON.parse(localStorage.getItem("user")).alcunha + "/foto/" + data[0];
                localStorage.setItem("imagem", JSON.stringify(caminho));
            } else localStorage.setItem("imagem", JSON.stringify("/image/utilizador_foto.jpg"));
        });
    } else localStorage.setItem("imagem", JSON.stringify("/image/utilizador_foto.jpg"));
}

function voltarPerfil() {
    if (JSON.parse(localStorage.getItem("user")).alcunha != "admin") {
        window.location.replace("perfil.html");
    } else window.location.replace("perfilAdmin.html");
}

function criarPortfolioPagina2() {
    //#region declaracao Variaveis
    localStorage.removeItem("portfolio");
    const tituloPortfolio = document.getElementById("campo_tituloPortfolio").value;
    const descricao = document.getElementById("campo_descricao").value;
    const motivacao = document.getElementById("campo_motivacoes").value;
    const selectPartilha = document.getElementById("campo_selectPartilha").value;
    //----------
    /**
     * OS campos para equipa
     */
    const nomeElem1 = document.getElementById("nomeElem1");
    const emailElem1 = document.getElementById("emailElem1");
    const teleElem1 = document.getElementById("teleElem1");
    //--
    const nomeElem2 = document.getElementById("nomeElem2");
    const emailElem2 = document.getElementById("emailElem2");
    const teleElem2 = document.getElementById("teleElem2");
    //--
    const nomeElem3 = document.getElementById("nomeElem3");
    const emailElem3 = document.getElementById("emailElem3");
    const teleElem3 = document.getElementById("teleElem3");
    //---------
    //#endregion declaracao Variaveis
    if (tituloPortfolio == "" ||
        descricao == "" ||
        motivacao == "" ||
        totalSelectAreas() == 0 ||
        selectPartilha == "") {
        alert("Tem que preencher os campos Dados Pessoais");
    } else {
        switch (novoMembro) {
            case 1:
                if (nomeElem1.value === "" || emailElem1.value === "" || teleElem1.value === "") {
                    alert("Tem que preencher os campos Dados Adicionais - Equipa : Membro 1");
                } else {
                    tratarPortolioEAreaCinetifica();
                    //adicionarMembrosEquipa(novoMembro);  
                }
                break;
            case 2:
                if (nomeElem1.value === "" || emailElem1.value === "" || teleElem1.value === "" ||
                    nomeElem2.value === "" || emailElem2.value === "" || teleElem2.value === "") {
                    alert("Tem que preencher os campos Dados Adicionais - Equipa : Membros 1 ou 2");
                } else {

                }
                break;
            case 3:
                if (nomeElem1.value === "" || emailElem1.value === "" || teleElem1.value === "" ||
                    nomeElem2.value === "" || emailElem2.value === "" || teleElem2.value === "" ||
                    nomeElem3.value === "" || emailElem3.value === "" || teleElem3.value === "") {
                    alert("Tem que preencher os campos Dados Adicionais - Equipa : Membros 1,2 ou 3");
                } else {

                }
                break;
            default:
                console.log("entrei no default");
                tratarPortolioEAreaCinetifica();
                break;
        }
    }
}
/**
 * MEtodo final que trata do portfolio+portfolio area cientifica
 */
function tratarPortolioEAreaCinetifica() {
    var titulo = inserirPortfolioIntoBD();
    var leitura = setInterval(function () {
        buscarLastPortfolioID(titulo);
        if (JSON.parse(localStorage.getItem("portfolio")) != null) {
            clearInterval(leitura);
            inserirPortfolioAreaCinetificaBD();
        }
    }, 2000);
}

function buscarLastPortfolioID(titulo) {
    var data = {
        utilizadorID: utilizadorID,
        titulo: titulo
    };
    loadData("POST", "/getPortfolioFromUtilizadorID", data, function (dados) {
        var portfolio = dados[0];
        var ptf = new Portfolio(
            portfolio.portfolio_nome,
            portfolio.portfolio_descricao,
            portfolio.portfolio_motivacoes,
            portfolio.portfolio_utilizadorID,
            portfolio.portfolio_partilha);
        ptf.setID(portfolio.portfolio_id);
        localStorage.setItem("portfolio", JSON.stringify(ptf));
    });
}
/**
 * Metodo que vai contar o total de areas selecionadas
 */
function totalSelectAreas() {
    const selectAreas = document.getElementById("campo_selectArea");
    var options = selectAreas && selectAreas.options;
    var areaSelect = 0;
    for (var i = 0; i < options.length; i++) {
        if (options[i].selected) {
            areaSelect++;
        }
    }
    return areaSelect;
}

function inserirPortfolioIntoBD() {
    var pagina1 = document.getElementById("pagina1");
    var pagina2 = document.getElementById("pagina2");
    const tituloPortfolio = document.getElementById("campo_tituloPortfolio").value;
    const descricao = document.getElementById("campo_descricao").value;
    const motivacao = document.getElementById("campo_motivacoes").value;
    const selectAreas = document.getElementById("campo_selectArea");
    const selectPartilha = document.getElementById("campo_selectPartilha").value;
    //#region insert into Portfolio
    utilizadorID = JSON.parse(localStorage.getItem("user")).userID;
    var novoPortfolio = new Portfolio(tituloPortfolio, descricao, motivacao, utilizadorID, selectPartilha, "Em Analise");
    insertUpdateDelete("POST", "/insertIntoPortfolio", novoPortfolio);
    document.getElementById("tituloPorfolio").value = novoPortfolio.nome;
    document.getElementById("userEmail").value = JSON.parse(localStorage.getItem("user")).email;
    //------------------------
    pagina1.style.display = "none";
    pagina2.style.display = "block";
    return tituloPortfolio;

}

function inserirPortfolioAreaCinetificaBD() {
    var portID = JSON.parse(localStorage.getItem("portfolio")).portfolioID;
    const selectAreas = document.getElementById("campo_selectArea");
    var options = selectAreas && selectAreas.options;
    for (var i = 0; i < options.length; i++) {
        if (options[i].selected) {
            var port_area = new Portfolio_AreaCientifica(portID, options[i].value);
            insertUpdateDelete("POST", "/insertIntoPrtfolioAreaCientifica", port_area);
        }
    }
}
/**
 *  Este metodo recebe o valor int de membros
 *  e ira adicionar a bd os membros consoante o i numeron recebido
 * @param {int} membros numero de membros (1,2 ou 3)
 */
function adicionarMembrosEquipa(membros) {
    console.log("entrei");
    var portID = JSON.parse(localStorage.getItem("portfolio")).portfolioID;
    for (let index = 1; index < membros + 1; index++) {
        const nome = document.getElementById("nomeElem" + index).value;
        const email = document.getElementById("emailElem" + index).value;
        const tele = document.getElementById("teleElem" + index).value;
        var novoElementoEquipa = new Portfolio_Equipa(portID, nome, email, tele);
        insertUpdateDelete("POST", "/insrtIntoPortfolioEquipa", novoElementoEquipa);
    }

}
var click = 0;

function mostrarElementosEquipaInput() {
    var fieldset = document.getElementById("fieldsetTemEquipa");
    click++;
    if (click > 1) {
        fieldset.style.display = "none";
        click = 0;
    } else {
        fieldset.style.display = "block";
    }
}

function getPortfoliosUtilizador() {
    var dat = {
        email: JSON.parse(localStorage.getItem("user")).email
    };
    loadData("POST", "/getUtilizadorFromEmail", dat, function (dados) {
        var utilizador = dados[0];
        if (utilizador) {
            var user = {
                id: utilizador.utilizador_id
            };
            loadData("POST", "/getPortfoliosUtilizador", user, function (dados) {
                dados.forEach(function (element) {
                    adicionarPortfoliosTabela(element, "tabela_content");
                });
            });
        }
    });
}

// PAGINA PESQUISA PORTFOLIO
function adicionarPortfoliosTabela(portfolio, elemento) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var botao = document.createElement("BUTTON");
    var nomeButao = document.createTextNode("Ver");
    td1.appendChild(document.createTextNode(portfolio.portfolio_nome));
    td2.appendChild(document.createTextNode(portfolio.porfolio_partilha));
    td3.appendChild(document.createTextNode(portfolio.portfolio_aceite));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    botao.setAttribute("id", portfolio.portfolio_id);
    botao.setAttribute("value", portfolio.portfolio_nome);
    botao.setAttribute("class", "botaoVer");
    botao.setAttribute("onclick", "apresentarPortfolio(this);");
    botao.appendChild(nomeButao);
    tr.appendChild(botao);
    document.getElementById(elemento).appendChild(tr);
}

function adicionarPortfoliosLista(portfolio, elemento) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.text = portfolio;
    a.id = "ancora_resultado";
    li.id = "resultados";
    a.setAttribute("onclick", "apresentarPortfolio(this);");
    li.appendChild(a);
    document.getElementById(elemento).appendChild(li);
}

function apresentarPortfolio(objeto) {
    var dado = null;
    if (objeto.nodeName === "A") {
        dado = {
            portfolio: objeto.text
        };
    } else {
        dado = {
            portfolio: objeto.value
        };
    }
    localStorage.setItem("portfolioToGO", JSON.stringify(dado));
    window.location.replace("template.html");
}

function preencherPesquisaAreas() {
    JSON.parse(localStorage.getItem("areas")).forEach(function (dado) {
        var p = document.createElement("p");
        var input = document.createElement("input");
        var label = document.createElement("label");
        input.type = "checkbox";
        input.value = dado;
        input.setAttribute("onclick", "showResultsSearch();");
        label.textContent = dado;
        label.id = "res";
        p.id = "opcaoArea";
        p.appendChild(input);
        p.appendChild(label);
        document.getElementById("areas").appendChild(p);
    });
}

function showResultsSearch() {
    removeChildsUL(document.getElementById("lista_portfolios"));
    var ordem = "";
    if (document.getElementById("order").value === "A-Z") {
        ordem = "ASC";
    } else ordem = "DESC";
    var colecao = document.getElementById("areas").childNodes;
    var dado = {
        areas: [],
        ordem: ordem,
        like: document.getElementById("campo_pesquisa").value
    };
    colecao.forEach(function (element) {
        if (element.firstChild.checked) {
            dado.areas.push(element.firstChild.value);
        }
    });
    if (dado.areas.length === 0 && dado.like.length === 0) {
        loadData("POST", "/getPortfoliosAceite", dado, function (dados) {
            dados.forEach(function (element) {
                adicionarPortfoliosLista(element.portfolio_nome, "lista_portfolios");
            });
        });
    } else if (dado.areas.length > 0) {
        loadData("POST", "/getPortfoliosFromArea", dado, function (dados) {
            dados.forEach(function (element) {
                adicionarPortfoliosLista(element.portfolio_nome, "lista_portfolios");
            });
        });
    } else if (dado.like.length > 0) {
        loadData("POST", "/getPortfoliosAceiteLike", dado, function (dados) {
            dados.forEach(function (element) {
                adicionarPortfoliosLista(element.portfolio_nome, "lista_portfolios");
            });
        });
    }
}

function pesquisar() {
    if (document.getElementById("campo_pesquisa").value.length > 0) {
        showResultsSearch();
    }
}

function esconderAreas(elemento) {
    switch (elemento) {
        case "tipo_filtro_area":
            if (document.getElementById("areas").style.display === "none") {
                document.getElementById("areas").style.display = "block";
            } else document.getElementById("areas").style.display = "none";
            break;
    }
}

function removeChildsSelect(elemento) {
    for (var i = elemento.options.length - 1; i >= 0; i--) {
        elemento.remove(i);
    }
}

function removeChildsUL(elemento) {
    while (elemento.childNodes.length > 0) {
        elemento.removeChild(elemento.childNodes[0]);
    }
}

function limparPesquisa() {
    document.getElementById("campo_pesquisa").value = "";
}

//
/**
 * ########################################################################
 * #############################----SPRINT 3----###########################
 * ########################################################################
 */

/**
 * Este metodo a cada click no botão "Adicionar Membro" ira criar os seguintes elementos
 * 3 textBox's nome,telefone,email e um botão remover
 */
var novoMembro = 0;

function criarNovoMembro() {
    novoMembro++;
    var fildSet = document.getElementById("fieldsetTemEquipa");
    if (novoMembro < 4) {
        var div = criarDiv("divMembro" + novoMembro);
        var div2 = criarDiv("group_membros");
        var div3 = criarDiv("group_membros");
        var div4 = criarDiv("group_membros");
        div.appendChild(criarBR());
        div.appendChild(criarLabel("Elemento " + novoMembro));
        div.appendChild(criarBotao("botaoRemover" + novoMembro));
        div.appendChild(criarBR());
        div2.appendChild(criarLabel("Nome :"));
        div2.appendChild(criarInputText("nomeElem" + novoMembro)); //nome
        div.appendChild(div2);
        div3.appendChild(criarLabel("Email :"));
        div3.appendChild(criarInputText("emailElem" + novoMembro)); //nome
        div.appendChild(div3);
        div4.appendChild(criarLabel("Telefone :"));
        div4.appendChild(criarInputText("teleElem" + novoMembro)); //nome
        div.appendChild(div4);
        fildSet.appendChild(div);
    } else {
        alert("Só pode adicionar 3 elementos adicionais...");
    }
}
/**
 * Este metodo recebe o elemento, neste caso BUTTON
 * e consoante o botao ira apagar a div associada a esse botao
 * @param {string} element 
 */
function apagarNovoMembro(element) {
    switch (element.id) {
        case "botaoRemover1":
            document.getElementById("divMembro1").remove();
            novoMembro = 0;
            break;
        case "botaoRemover2":
            document.getElementById("divMembro2").remove();
            novoMembro = 0;
            break;
        case "botaoRemover3":
            document.getElementById("divMembro3").remove();
            novoMembro = 0;
            break;

        default:
            break;
    }
}

function criarInputText(id) {
    var text = document.createElement("INPUT");
    text.setAttribute("type", "text");
    text.setAttribute("id", id);
    return text;
}

function criarLabel(text) {
    var label = document.createElement("LABEL");
    var nomeLabel = document.createTextNode(text);
    label.appendChild(nomeLabel);
    return label;
}

function criarBotao(id) {
    var botaoRemover = document.createElement("BUTTON");
    var nomeButao = document.createTextNode("Remover Membro");
    botaoRemover.setAttribute("id", id);
    botaoRemover.setAttribute("onclick", "javascript:apagarNovoMembro(this)");
    botaoRemover.appendChild(nomeButao);
    return botaoRemover;
}

function criarBR() {
    var br = document.createElement("BR");
    return br;
}

function criarDiv(id) {
    var div = document.createElement("DIV");
    div.setAttribute("id", id);
    return div;
}

function criarBotaoTabela(cls, id, titulo, funcao) {
    var botao = document.createElement("BUTTON");
    var nomeButao = document.createTextNode(titulo);
    botao.setAttribute("id", id);
    botao.setAttribute("class", cls);
    botao.setAttribute("onclick", funcao);
    botao.appendChild(nomeButao);
    return botao;
}

function ancora(caminho, texto, id) {
    var elemento = document.createElement("a");
    elemento.id = id;
    elemento.text = texto;
    elemento.href = caminho + texto;
    elemento.download = texto;
    return elemento;
}

function getPortfoliosNaoAceiteBD() {
    var portfoliosNaoAceite = [];
    var portfoliosNaoAceitesIDs = [];
    var objeto = {
        id: JSON.parse(localStorage.getItem("user")).userID
    }
    loadData("POST", "/getPortfoliosNaoAceite", objeto, function (dados) {
        dados.forEach(function (element) {
            var ptf = new PortfolioNaoAceite(
                element.portfolio_nome,
                element.utilizador_nome,
                element.porfolio_partilha,
                element.portfolio_aceite,
            );
            portfoliosNaoAceite.push(ptf);
            portfoliosNaoAceitesIDs.push(element.portfolio_id);
            localStorage.setItem("portfolioNaoAceite", JSON.stringify(portfoliosNaoAceite));
            localStorage.setItem("portfolioNaoAceiteIDs", JSON.stringify(portfoliosNaoAceitesIDs));
        });
        createTabelaLineValues();
    });
}

function createTabelaLineValues() {
    var portfoliosNaoAceite = JSON.parse(localStorage.getItem("portfolioNaoAceite"));
    var portfoliosNaoAceitesIDs = JSON.parse(localStorage.getItem("portfolioNaoAceiteIDs"));
    var tabela = document.getElementById("tabela_content");
    //----
    for (var i = 0; i < portfoliosNaoAceite.length; i++) {
        var tabelaRow = document.createElement("tr");
        var listaProp = Object.keys(portfoliosNaoAceite[0]);
        for (var j = 0; j < 4; j++) {
            var tabelaData = document.createElement("td");
            tabelaRow.setAttribute("id", portfoliosNaoAceitesIDs[i]);
            tabelaRow.setAttribute("name", "tabelaRow");
            var tabelaHeadValue = document.createTextNode(portfoliosNaoAceite[i][listaProp[j]]);
            tabelaData.appendChild(tabelaHeadValue);
            tabelaRow.appendChild(tabelaData);
        }
        tabelaRow.appendChild(criarBotaoTabela("botaoVer", portfoliosNaoAceitesIDs[i], "Ver", "verPortfolioAnalise(this)"));
        tabela.appendChild(tabelaRow);
    }
}

function insertRowSupport(elemento, conteudo, tipo) {
    var tabelaRow = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    td1.appendChild(document.createTextNode(conteudo.utilizador_nome));
    var a = document.createElement("a");
    var img = document.createElement("img");
    a.name = conteudo.utilizador_id;
    img.id = "miniaturas_support";
    a.appendChild(img);
    td2.appendChild(a);
    if (tipo === "add") {
        a.setAttribute("onclick", "javascript: adicinarToSupport(this);");
        img.src = "/image/add.png";
        tabelaRow.appendChild(td1);
        tabelaRow.appendChild(td2);
    } else {
        a.setAttribute("onclick", "javascript: removerSupport(this);");
        img.src = "/image/remove.png";
        tabelaRow.appendChild(td2);
        tabelaRow.appendChild(td1);
    }
    elemento.appendChild(tabelaRow);
}

function adicinarToSupport(value) {
    var data = {
        isSuport: 1,
        utilizadorID: parseInt(value.name)
    }
    var objeto = {
        utilizador: data.utilizadorID
    }
    loadData("POST", "/getUtilizadorFromID", objeto, function (dado) {
        var email = {
            email: dado.utilizador_email,
            emailSubject: "Privilégio de Suport ",
            emailText: 'Caro utilizador, ' + '\r\n\r\n' +
            'Parabéns, foi-lhe atribuida o privilégio de Suporte, a partir desta data' +
            ' podera aceder ao site Portfoliu com o privilégio de aceitar ou rejeitar' +
            ' porfolios submetidos por outros utilizadores.' + '\r\n\r\n' +
            'Cumprimentos,' + '\r\n' +
            'Equipa Suporte Portfoliu'
        }
        insertUpdateDelete("PUT", "/updateUserIsSuport", data);
        insertUpdateDelete("PUT", "/enviarEmail", email);
        carregarUtilizadoresSupport();
    });
}

function removerSupport(value) {
    var data = {
        isSuport: 0,
        utilizadorID: parseInt(value.name)
    }
    var objeto = {
        utilizador: data.utilizadorID
    }
    loadData("POST", "/getUtilizadorFromID", objeto, function (dado) {
        var email = {
            email: dado.utilizador_email,
            emailSubject: "Privilégio de Suport ",
            emailText: 'Caro utilizador, ' + '\r\n\r\n' +
            'Foi-lhe removido o privilégio de Suporte, a partir deste momento irá' +
            ' perder os privilégios adicionais que dispunha, para mais informações' +
            ' não hesite em contacttar-nos.' + '\r\n\r\n' +
            'Cumprimentos,' + '\r\n' +
            'Equipa Suporte Portfoliu'
        }
        insertUpdateDelete("PUT", "/updateUserIsSuport", data);
        insertUpdateDelete("PUT", "/enviarEmail", email);
        carregarUtilizadoresSupport();
    });
}

/**
 * Este metodo aceita um portfolio, recebe como paramentro o id
 * do portfolio, que esta associado a row em caso
 * @param {id} value 
 */
function aceitarPortfolio(value) {
    var data = {
        estado: "Aceite",
        portfolioID: value.id
    }
    var email = {
        email: JSON.parse(localStorage.getItem("analisar")).email,
        emailSubject: "Portfoliu foi aceite",
        emailText: 'Caro, ' + '\r\n\r\n' +
        JSON.parse(localStorage.getItem("analisar")).nome +
        ', o seu portfolio após uma analise cuidadosa foi ACEITE,' +
        ' parabéns pelo portfolio submetido na nossa Plataforma ' +
        ' Porfoliu "' + '\r\n\r\n' +
        'Cumprimentos,' + '\r\n' +
        'Equipa Suporte Portfoliu'
    }
    insertUpdateDelete("PUT", "/updatePortfolio", data);
    insertUpdateDelete("PUT", "/enviarEmail", email);
    window.location.replace("portfoliosSubmetidos.html");
}

/**
 * Este metodo rejeita um portfolio, recebe como paramentro o id
 * do portfolio, que esta associado a row em caso
 * @param {id} value 
 */
function rejeitarPortfolio(motivo) {
    var data = {
        estado: "Rejeitado",
        portfolioID: JSON.parse(localStorage.getItem("analisar")).portfolioID
    }
    var email = {
        email: JSON.parse(localStorage.getItem("analisar")).email,
        emailSubject: "Portfoliu foi Rejeitado",
        emailText: 'Caro, ' + '\r\n\r\n' +
        JSON.parse(localStorage.getItem("analisar")).nome +
        ', o seu portfolio após uma analise cuidadosa foi REJEITADO, motivo: ' + motivo + '\r\n' +
        ' por favor aceda ao site Porfoliu para corrgir os erros.' + '\r\n\r\n' +
        'Cumprimentos,' + '\r\n' +
        'Equipa Suporte Portfoliu'
    }
    insertUpdateDelete("PUT", "/updatePortfolio", data);
    insertUpdateDelete("PUT", "/enviarEmail", email);
    window.location.replace("portfoliosSubmetidos.html");
}

function checkSuport() {
    var utilizador = JSON.parse(localStorage.getItem("user"));
    if (utilizador.isSuport.data[0] === 1) {
        document.getElementById("divisao5").style.display = "inline-block";
    }
}

function irParaLogin() {
    window.location.replace("login.html");
}

function portfolios() {
    if (JSON.parse(localStorage.getItem("user"))) {
        window.location.replace("portfolios.html");
    } else {
        window.location.replace("realizarLogin.html");
    }
}

function verPortfolioAnalise(value) {
    var portID = {
        portfolioID: value.id
    }
    loadData("POST", '/getUtilizadorFromPorfolioID', portID, function (dados) {
        var obj = {
            nome: dados[0].utilizador_nome,
            email: dados[0].utilizador_email,
            portfolioID: value.id
        }
        localStorage.setItem("analisar", JSON.stringify(obj));
        window.location.replace("analisarPortfolio.html");
    });
}

function criarFormAnalisarPortfolio() {
    var objeto = JSON.parse(localStorage.getItem("analisar"));
    var elemento = document.getElementById("loginPage");
    var alcunha = "";
    document.getElementById("autor").appendChild(document.createTextNode(objeto.nome));
    loadData("POST", "/getPortfolioFromID", objeto, function (dado1) {
        portfolio = {
            id: dado1[0].portfolio_id,
            nome: dado1[0].portfolio_nome,
            descricao: dado1[0].portfolio_descricao,
            motivacao: dado1[0].portfolio_motivacoes,
            utilizador: dado1[0].portfolio_utilizadorID,
            partilha: dado1[0].porfolio_partilha
        };
        document.getElementById("nome_portfolio").appendChild(document.createTextNode(portfolio.nome));
        document.getElementById("partilha").appendChild(document.createTextNode(portfolio.partilha));
        document.getElementById("descricao").appendChild(document.createTextNode(portfolio.descricao));
        document.getElementById("motivacoes").appendChild(document.createTextNode(portfolio.motivacao));
        loadData("POST", "/getUtilizadorFromID", portfolio, function (dado2) {
            alcunha = dado2[0].utilizador_alcunha;
            var caminho = "/Utilizadores/" + alcunha + "/" + portfolio.nome + "/";
            var path1 = { caminho: caminho + "documentos/" };
            loadDocuments("POST", "/getPortfolioDocs", path1, function (dado3) {
                dado3.forEach(function (elemento) {
                    var li = document.createElement("li");
                    li.appendChild(ancora(path1.caminho, elemento, "links"));
                    document.getElementById("documentos_conteudos").appendChild(li);
                });
            });
            var path2 = { caminho: caminho + "imagens/" };
            loadDocuments("POST", "/getPortfolioImages", path2, function (dado4) {
                dado4.forEach(function (elemento) {
                    var li = document.createElement("li");
                    li.appendChild(ancora(path2.caminho, elemento, "links"));
                    document.getElementById("imagens_conteudos").appendChild(li);
                });
                var path3 = { caminho: caminho + "videos/" };
                loadDocuments("POST", "/getPortfolioVideos", path3, function (dado5) {
                    dado5.forEach(function (elemento) {
                        var li = document.createElement("li");
                        li.appendChild(ancora(path3.caminho, elemento, "links"));
                        document.getElementById("videos_conteudos").appendChild(li);
                    });
                    loadData("POST", "/getUtilizadorFromEmail", objeto, function (dado6) {
                        document.getElementById("imagem_utilizador_perfil2").src = "/Utilizadores/" +
                            dado6[0].utilizador_alcunha + "/foto/foto.jpg";
                        document.getElementById("analisarPortfolio").style.display = "block";
                        document.getElementById("seccao_downloads").style.display = "block";
                        elemento.appendChild(criarBotaoTabela("myButtonAceitar", objeto.portfolioID, "Aceitar", "aceitarPortfolio(this)"));
                        elemento.appendChild(criarBotaoTabela("myButtonRejeitar", objeto.portfolioID, "Rejeitar", "abrirPortfolioRejeitadoMotivo()"));
                    });
                });
            });
        });
    });

}

function abrirPortfolioRejeitadoMotivo(value) {
    window.location.replace("portfolioRejeitadoMotivo.html");
}

function finalizarRejeitarPorfolio() {
    var motivo = document.getElementById('campo_motivoRejicao').value;
    if (motivo === "") {
        alert("Tem que inserir um motivo.");
    } else {
        rejeitarPortfolio(motivo);
    }
}

//PARA-grafico
function getTotalPorfoliosAceites() {
    loadData("GET", '/getTotalPorfoliosAceites', null, function (dados) {
        var totalPort_util = new TotalPortfoliosGrafico(
            dados[0].total,
            dados[0].portfolio_aceite);
        localStorage.setItem("portfoliosAceites", JSON.stringify(totalPort_util));
    });
}
function getTotalPorfoliosRejeitados() {
    loadData("GET", '/getTotalPorfoliosRejeitados', null, function (dados) {
        var totalPort_util = new TotalPortfoliosGrafico(
            dados[0].total,
            dados[0].portfolio_aceite);
        localStorage.setItem("portfoliosRejeitados", JSON.stringify(totalPort_util));
    });
}

function verificarLogin() {
    if (localStorage.getItem("user")) {
        var elemento = document.getElementById("iniciar");
        elemento.removeAttribute("href");
        document.getElementById("lista_home_last").id = "lista_home_utilizadorNome";
        var img = document.createElement("img");
        img.id = "imagem_utilizador_home";
        img.src = JSON.parse(localStorage.getItem("imagem"));
        var parent = document.getElementById("lista_home_utilizadorNome");
        parent.insertBefore(img, parent.firstChild);
        elemento.text = JSON.parse(localStorage.getItem("user")).alcunha;
        elemento.href = "javascript: mostrarPerfil();";
        var newLi = document.createElement("li");
        newLi.id = "lista_home";
        var a = document.createElement("a");
        a.text = "LogOut";
        a.href = "javascript: apagar();";
        newLi.appendChild(a);
        document.getElementById("menu_home").appendChild(newLi);
    }
}

function carregarUtilizadoresSupport() {
    var tabela_add = document.getElementById("tabela_add_corpo");
    while (tabela_add.firstChild) {
        tabela_add.removeChild(tabela_add.firstChild);
    }
    var tabela_remove = document.getElementById("tabela_remove_corpo");
    while (tabela_remove.firstChild) {
        tabela_remove.removeChild(tabela_remove.firstChild);
    }
    loadData("POST", "/getUtilizadoresNotSupport", null, function (dado2) {
        dado2.forEach(function (element) {
            insertRowSupport(document.getElementById("tabela_add_corpo"), element, "add");
        });
        loadData("POST", "/getUtilizadoresSupport", null, function (dado1) {
            dado1.forEach(function (element) {
                insertRowSupport(document.getElementById("tabela_remove_corpo"), element, "remove");
            });
        });
    });
}

function getPortfoliosUtilizadorEditar() {
    var dat = {
        email: JSON.parse(localStorage.getItem("user")).email
    };
    loadData("POST", "/getUtilizadorFromEmail", dat, function (dados) {
        var utilizador = dados[0];
        if (utilizador) {
            var user = {
                id: utilizador.utilizador_id
            };
            loadData("POST", "/getPortfoliosUtilizador", user, function (dados) {
                dados.forEach(function (element) {
                    adicionarPortfoliosTabelaEditar(element, "tabela_editarContent");
                });
            });
        }
    });
}

function adicionarPortfoliosTabelaEditar(portfolio, elemento) {
    var tr = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var botao = document.createElement("BUTTON");
    var nomeButao = document.createTextNode("Editar");
    td1.appendChild(document.createTextNode(portfolio.portfolio_nome));
    td2.appendChild(document.createTextNode(portfolio.porfolio_partilha));
    td3.appendChild(document.createTextNode(portfolio.portfolio_aceite));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    botao.setAttribute("id", portfolio.portfolio_id);
    botao.setAttribute("value", portfolio.portfolio_nome);
    botao.setAttribute("class", "myButtonEditar");
    botao.setAttribute("onclick", "apresentarPortfolioEditar(this);");
    botao.appendChild(nomeButao);
    tr.appendChild(botao);
    document.getElementById(elemento).appendChild(tr);
}

function apresentarPortfolioEditar(objeto) {
    var dado = {
        portfolio: objeto.value
    };
    localStorage.setItem("portfolioEditar", JSON.stringify(dado));
    window.location.replace("editarPortfolio.html");
}

function editarInformacoesPortfolio() {
    const nome = document.getElementById("editarPortfolioTitulo").value;
    const descricao = document.getElementById("editarPortfolioDescricao").value;
    const motivacoes = document.getElementById("editarPortfolioMotivacoes").value;
    const area = document.getElementById("campo_editArea").value;
    const tipoPartilha = document.getElementById("editarPortfolioPartilha").value;
    const portfolioId = JSON.parse(localStorage.getItem("portfolioEditar")).portfolio_id;

    if (nome !== "" && descricao !== "" && motivacoes !== "" && area !== "" && tipoPartilha !== "") {
        var data = {
            id: portfolioId,
            nome: nome,
            descricao: descricao,
            motivacoes: motivacoes,
            partilha: tipoPartilha
        };
        insertUpdateDelete("PUT", "/editarPortfolio", data);
        window.location.replace("portfoliosEditarLista.html");
    }else {
        alert("Insira todos os dados");
    }
}