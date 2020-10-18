

-- drop database clayey;
CREATE SCHEMA IF NOT EXISTS `clayey` DEFAULT CHARACTER SET utf8 ;
USE `clayey` ;

 DROP TABLE IF EXISTS `clayey`.`Cliente` ;

CREATE TABLE IF NOT EXISTS `clayey`.`Cliente` (
  id_cliente INT NOT NULL AUTO_INCREMENT,
  nome_cliente VARCHAR(45) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  cep_cliente INT ,
  num_casa VARCHAR(45) ,
  cidade_cliente varchar(45) , 
  PRIMARY KEY (id_cliente));


    
    
 DROP TABLE IF EXISTS `clayey`.`Produto` ;

CREATE TABLE IF NOT EXISTS `clayey`.`Produto` (
    id_produto INT primary key AUTO_INCREMENT,
    nome_produto VARCHAR(45) NOT NULL,
    desc_produto VARCHAR(1000) NOT NULL,
    utilidade VARCHAR(100) NOT NULL,
    composicao VARCHAR(1000) NOT NULL,
    valor_produto DECIMAL(10,2) NOT NULL,
    peso INT NOT NULL,
    fabricacao VARCHAR(45) NOT NULL,
    qtdeDisponivel INT NOT NULL
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

insert into Produto (id_produto, nome_produto, desc_produto, utilidade,composicao,valor_produto, qtdeDisponivel, peso, fabricacao) values
	(1, 'Sabonete para Pele Normal', 'A composição do Óleo de Goiaba com o Óleo de Amêndoa e as
    Manteigas de Cacau e Cupuaçu traz a hidratação perfeita. O Óleo de Dendê além de
    colorir naturalmente o sabonete é rico em Vitamina E. O Óleo Essencial de Cedro 
    da Virgínia traz um aroma amadeirado proporcionando a sensação de conforto e calor.',
    'Ideal para todos os tipos de pele, traz hidratação, mas sem ressecar a pele', 'Palmiste
    , Óleo de Dendê, Óleo de Mamona, NaOH, Água Destilada, Óleo de Amêndoa, Azeite de Oliva
    Extra Virgem, Óleo de Goiaba, Manteigas de Cacau e Cupuaçu, Óleo Resina de Alecrim,
    Vitamina E, Dióxido de Titânio, Óleo Essencial Cedro da Virgínia. Por cold process.', 
    18.00, 50, 100, 'outubro de 2020')
    ;

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

select * from pedido;

 /* 
 
   
select p.id_pedido from Pedido p
inner join Cliente c on c.id_cliente = p.id_cliente
where p.id_cliente = 1
group by p.id_pedido ;

*/