window.onload = function (event) {
    //caso Home
    if(window.location.pathname === "/home.html"){
        adicionar();
        if(localStorage.getItem("user")){
            var elemento = document.getElementById("iniciar");
            elemento.removeAttribute("href");
            document.getElementById("lista_home_last").id = "lista_home_utilizadorNome";
            var img = document.createElement("img");
            img.id = "imagem_utilizador_home";
            img.src = "/image/utilizador_foto.jpg";
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
    }else if(window.location.pathname === "/perfil.html"){
        document.getElementById("imagem_utilizador_perfil").src = "/image/utilizador_foto.jpg";
        document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
    }else if(window.location.pathname === "/perfilUtilizador.html"){
        document.getElementById("imagem_utilizador_perfil").src = "/image/utilizador_foto.jpg";
        document.getElementById("imagem_utilizador_perfil2").src = "/image/utilizador_foto.jpg";
        document.getElementById("utilizador_nome").text = JSON.parse(localStorage.getItem("user")).alcunha;
        document.getElementById("utilizador_nome2").text = JSON.parse(localStorage.getItem("user")).alcunha;
        document.getElementById("espaco_nome").innerHTML = JSON.parse(localStorage.getItem("user")).nome;
        document.getElementById("espaco_email").innerHTML = JSON.parse(localStorage.getItem("user")).email;
        document.getElementById("espaco_data").innerHTML = JSON.parse(localStorage.getItem("user")).dataNascimeto;
        var cursos = JSON.parse(localStorage.getItem("cursos"));
        var universidades = JSON.parse(localStorage.getItem("universidades"));
        if(JSON.parse(localStorage.getItem("user")).cursoID){
            document.getElementById("espaco_curso").innerHTML = cursos[JSON.parse(localStorage.getItem("user")).cursoID];
        }else document.getElementById("espaco_curso").innerHTML = cursos[0];      
        if(JSON.parse(localStorage.getItem("user")).universidadeID){
            document.getElementById("espaco_universidade").innerHTML = universidades[JSON.parse(localStorage.getItem("user")).universidadeID];
        }else document.getElementById("espaco_universidade").innerHTML = universidades[0];
    }else if(window.location.pathname === "/editar.html"){
        document.getElementById("imagem_utilizador_perfil").src = "/image/utilizador_foto.jpg";
        document.getElementById("imagem_utilizador_perfil2").src = "/image/utilizador_foto.jpg";
    }
}

class Utilizador {
    constructor(nome, email, alcunha, data, password, universidade, curso){
        this.nome = nome;
        this.email = email;
        this.alcunha=alcunha;
        this.dataNascimeto = data;
        this.password = password;
        if(nome === "admin" && password === "admin"){
            this.isSuport = 1;
        }else this.isSuport=0;
        this.universidadeID = universidade;
        this.cursoID = curso;
    }
    setNome(_nome) {
        this.nome = _nome;
    }
    setSexo(_sexo) {
        this.sexo = _sexo;
    }
    setCursoID(_cursoID) {
        this.cursoID = _cursoID;
    }
    setUniversidadeID(_univID) {
        this.universidadeID = _univID;
    }
}

/**
 * Função para receber os dados de um novo utilizador atraves do post da pagina registo
 */
/**
 * verb POST-PUT-DELETE
   url - /insertIntoJogador  exemplo
   metodo que faz o update,insert e delete de uma linha na BD
 */
function insertUpdateDelete(verb, url, dados, handler) {
    var xhr = new XMLHttpRequest();
    xhr.open(verb, url, true); //true assincrono
    xhr.setRequestHeader("Content-Type", "application/json"); //definir o pedido
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            if(handler){
                handler();
            }                                         
        }
    };
    xhr.send(JSON.stringify(dados));
}

function loadData(verb, url,dados,handler) {
    var xhr= new XMLHttpRequest();
    xhr.open(verb, url,true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var responseText = JSON.parse(this.responseText); 
            responseText.forEach(function(data) {
                handler(data);
            });                               
        }
    };
    if(dados){
        xhr.send(JSON.stringify(dados));
    }else xhr.send();
}

function loadInitialData(verb, url,dados,handler) {
    var xhr= new XMLHttpRequest();
    xhr.open(verb, url,true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var responseText = JSON.parse(this.responseText);
            responseText.forEach((element, index,array) =>{
                if(index === array.length-1){
                    handler(element, true);
                }else handler(element, false);
            });                               
        }
    };
    if(dados){
        xhr.send(JSON.stringify(dados));
    }else xhr.send();
}

function registoUtilizador() {
    const nome = document.getElementById("campo_nome").value;
    const email = document.getElementById("campo_email").value;
    const alcunha=document.getElementById("campo_alcunha").value;
    const dataNasc = document.getElementById("campo_data").value;
    const password = document.getElementById("campo_password").value;
    const password2 = document.getElementById("campo_password2").value;
    //--
    if (password != password2) {
        alert("Password não coincidem...");
    } /*else if (idadeValida(dataNasc) == 0) {
        alert("Idade tem que ser superior ou igual a 18..");
    }*/ else {
        utilizador = new Utilizador(nome,email, alcunha, dataNasc, password, null, null);
        insertUpdateDelete("POST", "/insertIntoUtilizador", utilizador);
        window.location.replace("login.html");
    }
}

function loginUtilizador() {
    document.getElementById("loginFalhado").textContent = "";
    const email = document.getElementById("campo_email").value;
    const password = document.getElementById("campo_password").value;
    var data = {email: email,password: password};
    loadData("POST","/getUtilizadorFromEmailPassword",data,function(utilizador){
        if(email==utilizador.utilizador_email && password==utilizador.utilizador_password){
            var user = new Utilizador(utilizador.utilizador_nome, utilizador.utilizador_email, utilizador.utilizador_alcunha, 
                utilizador.utilizador_datanascimento.slice(0,10), utilizador.utilizador_password, utilizador.utilizador_universidadeID, 
                utilizador.utilizador_cursoID);
            localStorage.setItem("user", JSON.stringify(user));
            window.location.replace("home.html");
        }  
    }); 
    document.getElementById("loginFalhado").textContent = "Email ou Passwords invalidas"; 
}

function apagar(){
    localStorage.removeItem("user");
    window.location.replace("home.html");
}

function mostrarPerfil(){    
    window.location.replace("perfil.html");
}

function alteracaoPassword(){
    document.getElementById("inicial").style.display = "none";
    document.getElementById("alteracao_password").style.display = "block";
    document.getElementById("cmp_password_confirm").value = "";
    document.getElementById("cmp_password_new").value = "";
    document.getElementById("cmp_password_old").value = "";
    document.getElementById("erroPassword").textContent = "";
}

function alteracaoDadosPessoais(){
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
    if(JSON.parse(localStorage.getItem("user")).cursoID){
        document.getElementById("editar_curso").value = cursos[JSON.parse(localStorage.getItem("user")).cursoID];
    }else document.getElementById("editar_curso").value = cursos[0];      
    if(JSON.parse(localStorage.getItem("user")).universidadeID){
        document.getElementById("editar_universidade").value = universidades[JSON.parse(localStorage.getItem("user")).universidadeID];
    }else document.getElementById("editar_universidade").value = universidades[0];
}

function confirmarPassword(){
    const pass_antiga = document.getElementById("cmp_password_old").value;
    const pass_nova = document.getElementById("cmp_password_new").value;
    const pass_confirmacao = document.getElementById("cmp_password_confirm").value;
    var erro = document.getElementById("erroPassword");
    erro.textContent = "";
    if((pass_antiga && pass_antiga.length > 0) && (pass_nova && pass_nova.length > 0) 
        && (pass_confirmacao && pass_confirmacao.length > 0)){
        var data = {password: pass_antiga, email: JSON.parse(localStorage.getItem("user")).email};
        var passAntigaCorreta = false;
        loadData("POST","/getUtilizadorFromEmailPassword",data,function(utilizador){
            passAntigaCorreta = true;
            if(passAntigaCorreta){
                if(pass_nova === pass_confirmacao){
                    data = {password: pass_nova, email: JSON.parse(localStorage.getItem("user")).email};
                    insertUpdateDelete("PUT", "/updatePassword", data);
                    window.location.replace("perfilUtilizador.html");
                }else erro.textContent = "Passwords não são iguais";
            }
        });    
        erro.textContent = "Password Antiga não coincide";              
    }else erro.textContent = "Preencha todos os campos";
}

function cancelarPassword(){
    document.getElementById("alteracao_password").style.display = "none";
    document.getElementById("inicial").style.display = "block";
}

function confirmarDadosPessoais(){
    const nomeGet = document.getElementById("editar_nome").value;
    const dataNascGet = document.getElementById("editar_data").value;
    const universidadeGet = document.getElementById("editar_universidade").value;
    const cursoGet = document.getElementById("editar_curso").value;    
    var erro = document.getElementById("erroPerfil");
    erro.textContent = "";
    var uniID = null;
    var cursoID = null;
    if((nomeGet && nomeGet.length > 0) && (dataNascGet && dataNascGet.length > 0)
        && universidadeGet != "Não Definido" && cursoGet != "Não Definido"){  
        var aux = {uni: universidadeGet}; 
        loadData("POST","/getUniversidadeID",aux,function(dado){
            uniID = dado.universidade_id; 
            var aux2 = {cur: cursoGet};        
            loadData("POST","/getCursoID",aux2,function(dado){
                cursoID = dado.curso_id;
                var dados = {nome: nomeGet, data: dataNascGet, universidade: uniID, curso: cursoID, alcunha: JSON.parse(localStorage.getItem("user")).alcunha}
                insertUpdateDelete("PUT", "/editarUtilizador", dados, function(){
                    var dat = {email: JSON.parse(localStorage.getItem("user")).email};
                    loadData("POST","/getUtilizadorFromEmail",dat,function(utilizador){
                        var user = new Utilizador(utilizador.utilizador_nome, utilizador.utilizador_email, utilizador.utilizador_alcunha, 
                            utilizador.utilizador_datanascimento.slice(0,10), utilizador.utilizador_password, utilizador.utilizador_universidadeID, 
                            utilizador.utilizador_cursoID);
                            localStorage.setItem("user", JSON.stringify(user));
                        window.location.replace("perfilUtilizador.html");   
                    });
                });                         
            });
                   
        });
    }else erro.textContent = "Preencha todos os campos";    
}

function cancelarDadosPessoais(){
    document.getElementById("alteracao_dados_pessoais").style.display = "none";
    document.getElementById("inicial").style.display = "block";
}

function adicionarUniversidades(){
    universidades = [];
    universidades.push("Não Definido");
    loadInitialData("GET",'/getUniversidade',null,function(dados, ultimo){
        universidades.push(dados.universidade_nome);
        if(ultimo){
            localStorage.setItem("universidades", JSON.stringify(universidades));
        }
    });
}

function adicionarCurso(){
    cursos = [];
    cursos.push("Não Definido");
    loadInitialData("GET",'/getCursos',null,function(dados, ultimo){
        cursos.push(dados.curso_nome);
        if(ultimo){
            localStorage.setItem("cursos", JSON.stringify(cursos));
        }
    });
}

function adicionarAreaCientifica(){
    areasCientificas = [];
    areasCientificas.push("Não Definido");
    loadInitialData("GET",'/getAreaCientifica',null,function(dados,ultimo){
        areasCientificas.push(dados.area_nome);
        if(ultimo){
            localStorage.setItem("areas", JSON.stringify(areasCientificas));  
        }
    });
    
}

function adicionar(){
    adicionarUniversidades();
    adicionarCurso();
    adicionarAreaCientifica();
}

function preencherSelectCursos(elemento){
    var x = document.getElementById(elemento);
    for(var i = x.options.length - 1 ; i >= 0 ; i--){
        x.remove(i);
    }
    JSON.parse(localStorage.getItem("cursos")).forEach(function(dado){
        var option = document.createElement("option");
        option.text = dado;
        x.add(option);
    });
}

function preencherSelectUniversidades(elemento){
    var x = document.getElementById(elemento);
    for(var i = x.options.length - 1 ; i >= 0 ; i--){
        x.remove(i);
    }
    JSON.parse(localStorage.getItem("universidades")).forEach(function(dado){
        var option = document.createElement("option");
        option.text = dado;
        x.add(option);
    });
}