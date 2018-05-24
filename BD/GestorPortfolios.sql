USE mysql;

DROP DATABASE IF EXISTS GestorPortfolios;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE GestorPortfolios;

USE GestorPortfolios;


CREATE TABLE Cursos(
	curso_id int AUTO_INCREMENT,
    curso_sigla nvarchar(30) NOT NULL,
    curso_nome nvarchar(200) NOT NULL,
    PRIMARY KEY(curso_id)
);

CREATE TABLE  AreaCientifica(
	area_id int AUTO_INCREMENT,
    area_nome nvarchar(100) NOT NULL,
    PRIMARY KEY(area_id)
);

CREATE TABLE Universidades(
	universidade_id int AUTO_INCREMENT,
    universidade_nome nvarchar(200) NOT NULL,
    universidade_localidade nvarchar(30) NOT NULL,
    PRIMARY KEY(universidade_id)
);

CREATE TABLE Utilizador(
	utilizador_id int AUTO_INCREMENT,
    utilizador_alcunha  nvarchar(50) NOT NULL,
    utilizador_nome nvarchar(50) NOT NULL,
    utilizador_datanascimento date NOT NULL,
    utilizador_email nvarchar(50) NOT NULL,
    utilizador_password nvarchar(50) NOT NULL,
    utilizador_universidadeID int NULL,
    utilizador_cursoID int NULL,    
    utilizador_isSuport varchar(10) not null,
    PRIMARY KEY(utilizador_id),
    FOREIGN KEY (utilizador_cursoID) REFERENCES Cursos (curso_id),
    FOREIGN KEY (utilizador_universidadeID) REFERENCES Universidades (universidade_id)       
);

CREATE TABLE Portfolio(
	portfolio_id int AUTO_INCREMENT,
    portfolio_descricao nvarchar(200) NOT NULL,
    portfolio_utilizadorID int NOT NULL,
    PRIMARY KEY (portfolio_id),
    FOREIGN KEY (portfolio_utilizadorID) REFERENCES Utilizador (utilizador_id)
);

CREATE TABLE Portfolio_Equipa(
	equipa_portfolioID int NOT NULL,
    equipa_nome nvarchar(30) NOT NULL,
    FOREIGN KEY (equipa_portfolioID) REFERENCES Portfolio (portfolio_id)
);                             

CREATE TABLE Portfolios_AreaCientifica(
	portfolioArea_portfolioID int NOT NULL,
    portfolioArea_areaID int NOT NULL,
    FOREIGN KEY (portfolioArea_portfolioID) REFERENCES Portfolio (portfolio_id),
    FOREIGN KEY (portfolioArea_areaID) REFERENCES AreaCientifica (area_id) 
);
