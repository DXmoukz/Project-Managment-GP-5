DROP DATABASE IF EXISTS heroku_a89ca2e75c77938;

CREATE DATABASE heroku_a89ca2e75c77938;

USE heroku_a89ca2e75c77938;

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
    utilizador_telefone nvarchar(15) NOT NULL,
    utilizador_password nvarchar(50) NOT NULL,
    utilizador_universidadeID int NULL,
    utilizador_cursoID int NULL,    
    utilizador_isSuport bit not null,
    PRIMARY KEY(utilizador_id),
    FOREIGN KEY (utilizador_cursoID) REFERENCES Cursos (curso_id),
    FOREIGN KEY (utilizador_universidadeID) REFERENCES Universidades (universidade_id)       
);

CREATE TABLE Portfolio(
	portfolio_id int AUTO_INCREMENT,
    portfolio_nome nvarchar(30) NOT NULL,
    portfolio_descricao nvarchar(200) NOT NULL,
    portfolio_motivacoes nvarchar(200) NOT NULL,
    portfolio_utilizadorID int NOT NULL,
    porfolio_partilha nvarchar(50) NOT NULL,
    portfolio_aceite nvarchar(15) NOT NULL,
    PRIMARY KEY (portfolio_id),
    FOREIGN KEY (portfolio_utilizadorID) REFERENCES Utilizador (utilizador_id)
);

CREATE TABLE Portfolio_Equipa(
	equipa_portfolioID int NOT NULL,
    equipa_nome nvarchar(30) unique NOT NULL,
    equipa_email nvarchar(50) NOT NULL,
    equipa_telefone nvarchar(15) NOT NULL,
    FOREIGN KEY (equipa_portfolioID) REFERENCES Portfolio (portfolio_id)
);                             

CREATE TABLE Portfolios_AreaCientifica(
	portfolioArea_portfolioID int NOT NULL,
    portfolioArea_areaID int NOT NULL,
    FOREIGN KEY (portfolioArea_portfolioID) REFERENCES Portfolio (portfolio_id),
    FOREIGN KEY (portfolioArea_areaID) REFERENCES AreaCientifica (area_id) 
);

Insert Into Cursos (curso_sigla,curso_nome)
Values
('ND','Não Definido'),
('EI','Engenharia Informática'),
('EE','Engenharia Eletrotécnica'),
('CC','Ciências da Computação'),
('EM','Engenharia Mecânica'),
('TB','Tecnologia Biomédica'),
('TE','Tecnologias de Energia'),
('TGI','Tecnologia e Gestão Industrial'),
('ENF','Enfermagem'),
('FIS','Fisioterapia'),
('TF','Terapia da Fala'),
('DES','Desporto'),
('GRH','Gestão de Recursos Humanos'),
('GDR','Gestão da Distribuição e da Logística'),
('CF','Contabilidade e Finanças'),
('BIO','Biotecnologia'),
('CFL','Ciências Florestais'),
('AA','Astronomia e Astrofísica'),
('MAT','Matematica'),
('FIS','Fisica');

Insert into Universidades (universidade_nome,universidade_localidade)
Values 
('Não Definido','ND'),
('Instituto Politecnico de Setubal','Setubal'),
('Universidade de Evora','Evora'),
('Universidade de Lisboa','Lisboa'),
('Instituto Superior Técnico','Lisboa'),
('Universidade Nova de Lisboa','Lisboa'),
('ISCTE Instituto Universitário de Lisboa','Lisboa'),
('Universidade Lusófona do Porto','Porto'),
('Instituto Superior Miguel Torga','Coimbra'),
('Universidade de Coimbra','Coimbra'),
('Universidade do Algarve','Algarve'),
('Universidade de Aveiro','Aveiro'),
('Universidade da Madeira','Madeira'),
('Universidade Atlântica','Oeiras'),
('Universidade Lusíada','Lisboa'),
('Universidade Fernando Pessoa','Porto'),
('Universidade Católica Portuguesa','Lisboa');

Insert into AreaCientifica (area_nome)
Values 
('Finanças'),
('Macroeconomia'),
('Microeconomia'),
('Direito'),
('História'),
('Telecomunicações'),
('Sociologia'),
('Economia Aplicada e Métodos'),
('Análise e Matemática Financeira'),
('Econometrica'),
('Investigação Operacional'),
('Arquiteturas e Sistemas Operativos'),
('Engenharia de Software e Sistemas de Informação'),
('Computação Gráfica e Multimédia'),
('Inteligência Artificial'),
('Astronomia e Astrofísica'),
('Física Atómica e Molecular'),
('Sistemas de Informação');

insert into utilizador (utilizador_alcunha, utilizador_nome, utilizador_datanascimento, utilizador_email, utilizador_telefone, 
utilizador_password, utilizador_universidadeID, utilizador_cursoID, utilizador_isSuport) 
values
('admin', 'admin', '1990-01-20', 'admin@portfoliu.com', '916545478', 'admin',1,1,1),
('danfdias', 'Daniel Dias', '1995-02-10', 'daniel_._19@hotmail.com', '918652456', 'nova',11,11,0),
('sebas', 'Sebastian Cheregi', '1995-02-10', 'sebastian.cheregi@hotmail.com', '935645243', '1234',11,11,1),
('danielMateus', 'Daniel Mateus', '1995-02-10', 'daniel.mateus@hotmail.com', '918652456', 'daniel',11,11,0),
('RodrigoM', 'Rodrigo Marques', '1995-02-10', 'rodrigo.marques@hotmail.com', '918652456', 'rodrigo',61,101,0),
('RMonteiro', 'Ricardo Monteiro', '1995-02-10', 'ricardo.monteiro@hotmail.com', '918652456', 'rm',31,41,1),
('anabela', 'Anabela Baptista', '1995-02-10', 'anabela.baptista@hotmail.com', '918652456', 'anabela',61,101,0),
('diana', 'Diana Santos', '1995-02-10', 'diana.santos@hotmail.com', '918652456', 'diana',31,41,1),
('carlota', 'Carlota Simoes', '1996-02-10', 'carlota.simoes@hotmail.com', '918652456', 'carlota',61,101,0),
('raquel', 'Raquel Junqueira', '1995-02-10', 'raquel.junqueira@hotmail.com', '918652456', 'raquel',31,41,1),
('sofia', 'Sofia del Carmen', '1995-02-10', 'sofia.carmen@hotmail.com', '918652456', 'sofia',61,101,0);

insert into portfolio (portfolio_nome, portfolio_descricao, portfolio_motivacoes, portfolio_utilizadorID,porfolio_partilha,portfolio_aceite) 
values
 ('Estagio na Apple','Este é o meu relatorio de estágio na empresa Apple durante 10 meses, onde estive inserido num projeto web internacional.',
'As minhas motivações para este estágio foram de me superar e aprender mais!', 11,'Publico','Aceite'),
 ('Estagio na Google','Este é o meu relatorio de estágio na empresa Google durante 3 meses, onde estive inserido num projeto web nacional.',
'As minhas motivações para este estágio foram de me superar e aprender mais!', 21,'Publico','Aceite'),
 ('Estagio na Google','Este é o meu relatorio de estágio na empresa Google durante 3 meses, onde estive inserido num projeto web nacional.',
'As minhas motivações para este estágio foram de me superar e aprender mais!', 21,'Publico','Rejeitado'),
 ('Estagio na Google','Este é o meu relatorio de estágio na empresa Google durante 3 meses, onde estive inserido num projeto web nacional.',
'As minhas motivações para este estágio foram de me superar e aprender mais!',21,'Publico','Rejeitado'),
 ('Estagio na Microsoft','Este é o meu relatorio de estágio na empresa Microsoft durante 2 meses, onde estive inserido num projeto nacional.',
'As minhas motivações para este estágio foram de me superar e aprender mais!', 11,'Publico','Em Analise'),
('Editor de Imagens','O presente trabalho insere-se no domínio de estudo sobre o desenvolvimento da literacia visual através da utilização do editor de Imagens',
'As minhas motivações para este projeto foram de me superar e aprender mais!',61,'Publico', 'Aceite'),
('Projeto Estagio','O presente relatório de estágio contempla uma metodologia de projeto focada na evidência científica sobre os efeitos da musicoterapia no alívio da dor pós-operatória no cliente cirúrgico.',
'As minhas motivações para este projeto foram de me superar e aprender mais!',71,'Publico', 'Aceite'),
('Componente de Investigação','A existência de um número maior de conceitos e conteúdos a compreender e reter nas diversas áreas curriculares',
'As minhas motivações para este projeto foram de me superar e aprender mais!',81,'Publico', 'Aceite'),
('Estrategias de Desenvolvimento','O estudo atual insere-se na área curricular disciplinar de Educação Visual e Tecnológica e pretende analisar de que forma a utilização do método de resolução de problemas',
'As minhas motivações para este projeto foram de me superar e aprender mais!',91,'Publico', 'Aceite'),
('Plano de Segurança e Saude','A legislação portuguesa introduziu a figura documental do Plano de Segurança e Saúde nos processos de construção civil',
'As minhas motivações para este projeto foram de me superar e aprender mais!',101,'Publico', 'Aceite');

insert into portfolios_areacientifica values (1,31),(1,1),(1,11),(1,111);
insert into portfolios_areacientifica values (11,31),(11,91),(11,11),(11,111);
insert into portfolios_areacientifica values (41,31),(41,61),(41,41),(41,111);
insert into portfolios_areacientifica values (51,21);
insert into portfolios_areacientifica values (61,51),(61,61),(61,41),(61,111);
insert into portfolios_areacientifica values (71,41),(71,61),(71,41),(71,101);
insert into portfolios_areacientifica values (81,71),(81,61),(81,111);
insert into portfolios_areacientifica values (91,31),(91,61);

insert into portfolio_equipa values 
(1,'Carlos Ribeiro','carlos@mail.com','935246684'),
(1,'Joao Santos','johny@gmail.com','965478123');