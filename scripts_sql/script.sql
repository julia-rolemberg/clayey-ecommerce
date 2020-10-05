

drop database clayey;
CREATE SCHEMA IF NOT EXISTS `clayey` DEFAULT CHARACTER SET utf8 ;
USE `clayey` ;

 DROP TABLE IF EXISTS `clayey`.`Cliente` ;

CREATE TABLE IF NOT EXISTS `clayey`.`Cliente` (
  id_cliente INT NOT NULL AUTO_INCREMENT,
  nome_cliente VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  cep_cliente INT NOT NULL,
  num_casa VARCHAR(45) NOT NULL,
  cidade_cliente varchar(45) NOT NULL, 
  PRIMARY KEY (id_cliente));


    
    
 DROP TABLE IF EXISTS `clayey`.`Produto` ;

CREATE TABLE IF NOT EXISTS `clayey`.`Produto` (
  id_produto INT primary key AUTO_INCREMENT,
  nome_produto VARCHAR(45) NOT NULL,
  desc_produto VARCHAR(45) NOT NULL,
  modo_usar VARCHAR(45) NOT NULL,
  composicao VARCHAR(45) NOT NULL,
  valor_produto DECIMAL(10,2) NOT NULL
  );


 DROP TABLE IF EXISTS `clayey`.`Pedido` ;

CREATE TABLE IF NOT EXISTS `clayey`.`Pedido` (
  id_pedido INT primary key AUTO_INCREMENT,
  data_pedido DATE NOT NULL,
  id_cliente INT not null,
  foreign key (id_cliente) references Cliente(id_cliente),
  valor_total DECIMAL(10,2) NOT NULL
  );




DROP TABLE IF EXISTS `clayey`.`Item` ;

CREATE TABLE IF NOT EXISTS `clayey`.`Item` (
  id_produto INT NOT NULL,
  foreign key(id_produto) references Produto(id_produto),
  id_pedido INT NOT NULL,
  foreign key(id_pedido) references Pedido(id_pedido),
  qtde INT NOT NULL,
  valor_item DECIMAL(10,2) NOT NULL
 );


insert into Cliente (nome_cliente, email, senha, cep_cliente, num_casa, cidade_cliente) values
	('cliente 1', 'cliente1@mail.com', '1234', 08998020,'342', 'São Paulo'),
    ('cliente 2', 'cliente2@mail.com', '1234', 12343223, '887A', 'Santo André'),
    ('cliente 3', 'cliente3@mail.com', '1234', 87876020, '65', 'São Bernando do Campo'),
    ('cliente 4', 'cliente4@mail.com', '1234', 09808070, '33', 'Santo André');


select * from Cliente;

insert into Produto (nome_produto, desc_produto, modo_usar,composicao,valor_produto) values
	('argila branca', 'decricao argila branca', 'como usar argila branca', 'composição argila branca', 46.00),
	('argila vermelha', 'decricao argila vermelha', 'como usar argila vermelha', 'composição argila vermelha', 46.00),
	('alecrim', 'decricao alecrim', 'como usar alecrim', 'composição alecrim', 50.00),
	('carvão ativado', 'decricao carvão ativado', 'como usar carvão ativado', 'composição carvão ativado', 50.00),
	('amêndoas', 'decricao amêndoas', 'como usar amêndoas', 'composição amêndoas', 56.00);

select * from Produto;


insert into Pedido ( data_pedido, id_cliente, valor_total) values
    ( '2020-09-30', 2, 96.00),
    ( '2020-09-30', 3, 46.00),
    ( '2020-09-30', 1, 46.00)
	;
    

-- DROP TABLE IF EXISTS Item;

select * from pedido;

insert into Item (id_produto, id_pedido, qtde, valor_item) values
	(1,2, 1, 46.00),
    (2,3, 2, 46.00),
    (4,1, 2, 50.00),
    (3,2, 1, 50.00),
    (2,1, 1, 46.00);

select * from Item;

 /* 
 
   
select p.id_pedido from Pedido p
inner join Cliente c on c.id_cliente = p.id_cliente
where p.id_cliente = 1
group by p.id_pedido ;

*/