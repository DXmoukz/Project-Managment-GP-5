USE GestorPortfolios;

Insert Into GestorPortfolios.Cursos (curso_sigla,curso_nome)
Values
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

Insert into GestorPortfolios.Universidades (universidade_nome,universidade_localidade)
Values 
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

Insert into GestorPortfolios.AreaCientifica (area_nome)
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
('danfdias', 'Daniel Dias', '1995-02-10', 'dandias@gmail.com', '918652456', 'nova',1,1,0),
('sebas', 'Sebastian Cheregi', '1995-02-10', 'sebas@sebas.com', '918652456', '1234',1,1,0);




insert into portfolio (portfolio_nome, portfolio_descricao, portfolio_motivacoes, portfolio_utilizadorID,porfolio_partilha) 
values ('Estagio na Google','Este é o meu relatorio de estágio na empresa Google durante 3 meses, onde estive inserido num projeto web nacional.',
'As minhas motivações para este estágio foram de me superar e aprender mais!', 1,'Publico'),
('asdasdas','Este sdadasdsdsa.',
'As minhas motivações!', 1,'Publico'),
('Estagio','Este projeto web nacional.',
'motv!', 1,'Publico');

insert into portfolios_areacientifica values (1,4),(1,10),(1,1),(1,12);
insert into portfolios_areacientifica values (2,2),(2,11);
insert into portfolios_areacientifica values (2,4),(2,5),(2,6);

insert into portfolio_equipa values (1,'Carlos Ribeiro','carlos@mail.com','935246684'),(1,'Joao Santos','johny@gmail.com','965478123');



