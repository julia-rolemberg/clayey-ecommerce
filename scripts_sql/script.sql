

-- drop database clayey;
CREATE SCHEMA IF NOT EXISTS `clayey` DEFAULT CHARACTER SET utf8 ;
USE `clayey` ;

-- DROP TABLE IF EXISTS `clayey`.`Cliente` ;

CREATE TABLE IF NOT EXISTS `clayey`.`Cliente` (
  id_cliente INT NOT NULL AUTO_INCREMENT,
  nome_cliente VARCHAR(45) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(45) NOT NULL,
  token CHAR(64) NULL,
  cep_cliente int ,
  rua_cliente varchar(50),
  num_casa VARCHAR(45) ,
  complemento VARCHAR(45) ,
  bairro_cliente VARCHAR(45) ,
  cidade_cliente varchar(45) , 
  estado_cliente varchar(45) , 
  admin_cliente tinyint NOT NULL,
  PRIMARY KEY (id_cliente),
  UNIQUE KEY cliente_email_UN (email)
);

select * from cliente;
    
    
-- DROP TABLE IF EXISTS `clayey`.`Produto` ;

CREATE TABLE IF NOT EXISTS `clayey`.`Produto` (
    id_produto INT primary key AUTO_INCREMENT,
    nome_produto VARCHAR(45) NOT NULL,
    desc_produto VARCHAR(1000) NOT NULL,
    utilidade VARCHAR(1000) NOT NULL,
    composicao VARCHAR(1000) NOT NULL,
    valor_produto DECIMAL(10,2) NOT NULL,
    peso INT NOT NULL,
    fabricacao VARCHAR(40) NOT NULL,
    qtdeDisponivel INT NOT NULL
  );


-- DROP TABLE IF EXISTS `clayey`.`Pedido` ;

CREATE TABLE IF NOT EXISTS `clayey`.`Pedido` (
  id_pedido INT primary key AUTO_INCREMENT,
  data_pedido DATETIME NOT NULL,
  id_cliente INT not null,
  foreign key (id_cliente) references Cliente(id_cliente),
  valor_total DECIMAL(10,2) NOT NULL,
  ativo BOOLEAN not null
  );


-- DROP TABLE IF EXISTS `clayey`.`Item` ;

CREATE TABLE IF NOT EXISTS `clayey`.`Item` (
  id_produto INT NOT NULL,
  foreign key(id_produto) references Produto(id_produto),
  id_pedido INT NOT NULL,
  foreign key(id_pedido) references Pedido(id_pedido),
  qtde INT NOT NULL,
  valor_item DECIMAL(10,2) NOT NULL
 );
insert into Cliente (nome_cliente, email, senha, admin_cliente) values
  ('admin', 'admin', '1234',  1);
insert into Cliente (nome_cliente, email, senha, cep_cliente, rua_cliente, num_casa, complemento, bairro_cliente, cidade_cliente, estado_cliente, admin_cliente) values
  ('Ana Luiza', 'analuiza@mail.com', '1234', 18998020, 'Rua das Flores','342','bloco C - 122','Penha' ,'São Paulo', 'SP', 0),
  ('Raphael', 'raphael@mail.com', '1234', 12343223, 'Rua Iluminada', '887A','casa','Alvorada' , 'Santo André', 'SP', 0),
  ('Julia', 'julia@mail.com', '1234', 87876020, 'Av. 16 de Outubro','20','','Pitangueiras' , 'São Paulo', 'SP', 0);



-- DROP TABLE IF EXISTS `clayey`.`Produto` ;

insert into Produto (id_produto, nome_produto, desc_produto, utilidade,composicao,valor_produto, qtdeDisponivel, peso, fabricacao) values
	(1, 'Sabonete para Pele Normal', 'A composição do Óleo de Goiaba com o Óleo de Amêndoa e as
    Manteigas de Cacau e Cupuaçu traz a hidratação perfeita. O Óleo de Dendê além de
    colorir naturalmente o sabonete é rico em Vitamina E. O Óleo Essencial de Cedro 
    da Virgínia traz um aroma amadeirado proporcionando a sensação de conforto e calor.',
    'Ideal para todos os tipos de pele, traz hidratação, mas sem ressecar a pele', 'Palmiste,
    Óleo de Dendê, Óleo de Mamona, NaOH, Água Destilada, Óleo de Amêndoa, Azeite de Oliva
    Extra Virgem, Óleo de Goiaba, Manteigas de Cacau e Cupuaçu, Óleo Resina de Alecrim,
    Vitamina E, Dióxido de Titânio, Óleo Essencial Cedro da Virgínia. Por cold process.', 
    18.00, 50, 100, '2020-10-01'),
    (2, 'Sabonete Antiacne', 'A Argila Verde é indicada para peles acneicas e oleosas devido 
    ao seu efeito adstringente, secativo e bactericida. O Óleo de Semente de Uva ajuda na 
    retenção das propriedades da argila na pele e a manteiga de Cupuaçu nutre fazendo, também, 
    uma hidratação suave. Os óleos essenciais de Tea Tree e Patchouli além de trazerem um aroma 
    agradável, contribuem na cicatrização das acnes, proporcionando um bem-estar físico e emocional.', 
    'Ideal para pele oleosa e/ou acnéica. Recomenda-se usar de 2 a 3 vezes por semana fazendo uma 
    leve esfoliação, não utilizar a barra diretamente no rosto, fazer uma espuma com as mãos e 
    então lavar o rosto.', 'Palma, Palmiste, Óleo de Girassol, Óleo de Canola, Água Destilada, 
    NaOH, Óleo de Semente de Uva, Manteiga de Cupuaçu, Óleo Resina de Alecrim, Vitamina E, Argila 
    Verde, Óleo Essencial de Tea Tree e Patchouli. Por cold process.', 18.00, 50, 100, '2020-07-01'),
    (3, 'Sabonete Dendê', 'O Óleo de Dendê além de colorir naturalmente o sabonete é rico em 
    Vitamina E. O Óleo de Semente de Uva com o Azeite de Oliva, traz elasticidade natural a pele 
    e as Manteigas de Cacau e Cupuaçu ajudam na hidratação. O Óleo Essencial de Petitgrain é fresco, 
    floral e levemente herbáceo, traz benefícios calmantes e relaxantes para aliviar sentimentos de 
    tensão e estresse.', 'Ideal para todos os tipos de pele, traz hidratação, mas sem ressecar a pele.',
    'Palmiste, Óleo de Dendê, Óleo de Mamona, Óleo de Girassol, NaOH, Água Destilada, Óleo de Semente 
    de Uva, Azeite de Oliva Extra Virgem, Manteigas de Cacau e Cupuaçu, Óleo Resina de Alecrim, Vitamina 
    E, Dióxido de Titânio, Óleo Essencial de Petitgrain. Por cold process.', 18.00, 50, 100, '2020-10-01'),
    (4, 'Sabonete para Pele Mista', 'O Óleo de Macadâmia tem eficácia em nutrir e hidratar a pele sem 
    trazer oleosidade, muito utilizado para peles mistas. O Óleo de Amêndoa em conjunto com a Manteiga 
    de Cupuaçu e a Manteiga de Cacau trazem propriedades de hidratação profunda na pele. O Óleo Essencial 
    de Patchouli traz propriedades anti-inflamatória, anti sépticas e cicatrizantes, além de um delicioso 
    aroma amadeirado.', 'Ideal para pele mista, traz hidratação, mas sem ressecar a pele. Pode ser utilizado 
    diariamente.', 'Palma, Palmiste, Água destilada, NaOH, Óleo de Amêndoa, Óleo de Macadâmia, Azeite de 
    Oliva extra Virgem, Manteigas de Cacau e Cupuaçu, Vitamina E, Óleo de Resina de Alecrim, Ultramarine 
    Azul, Óleo Essencial de Patchouli. Por cold process.', 18.00, 50, 100, '2020-04-01'),
    (5, 'Sabonete Hidratante', 'O Óleo de Amêndoa em conjunto com a Manteiga de Cupuaçu e a Manteiga de 
    Cacau trazem propriedades de hidratação profunda na pele. O Óleo Essencial de Petitgrain é fresco, 
    floral e levemente herbáceo, traz benefícios calmantes e relaxantes para aliviar sentimentos de tensão 
    e estresse.', 'Ideal para pele seca. Pode ser usado diariamente no corpo e na face.', 'Palma, Palmiste, 
    Água Destilada, NaOH, Óleo de Amêndoa, Óleo de Mamona, Azeite de Oliva Extra Virgem, Óleo de Semente de 
    Uva, Manteigas de Cacau e Cupuaçu, Óleo Resina de Alecrim, Vitamina E, Óleo Essencial de Petitgrain. 
    Por cold process.', 18.00, 50, 100, '2020-07-01'),
    (6, 'Sabonete de Argila Vermelha', 'A Argila Vermelha é indicada para peles maduras e sensíveis ajudando 
    a prevenir o envelhecimento da pele, trata as linhas de expressão de forma suave e delicada, é rica em 
    Óxido de Ferro, Cobre e Silício. O Óleo de Goiaba é um antioxidante, nutre e protege a pele. O Óleo 
    Essencial de Lavanda Francesa acalma e relaxa, trazendo bem-estar e equilíbrio.', 'Ideal para pele madura 
    e sensível. Recomenda-se usar de 2 a 3 vezes por semana fazendo uma leve esfoliação, não utilizar a barra 
    diretamente no rosto, fazer uma espuma com as mãos e então lavar o rosto. Combina perfeitamente intercalado 
    com o Sabonete para Pele Madura.', 'Palma, Palmiste, Água destilada, NaOH, Óleo de Amêndoa, Óleo de Mamona, 
    Azeite de Oliva Extra Virgem, Óleo de Goiaba, Manteiga de Cacau, Óleo Resina de Alecrim, Vitamina E, Argila 
    Vermelha, Óxido de Ferro Vermelho, Óleo Essencial de Lavanda Francesa. Por cold process.', 18.00, 50, 100, 
    '2020-08-01'),
    (7, 'Sabonete de Carvão Ativado', 'O Carvão Ativado é indicado para pele oleosa, ele absorve impurezas, 
    oleosidades e toxinas da pele a deixando balanceada, traz uma esfoliação média. O Óleo Rosa Mosqueta tem 
    Vitamina A, agindo como regenerador da pele. A sinergia da composição dos Óleos Essenciais de Melaleuca, 
    Cipreste e Tomilho é anti-inflamatória, anti fúngicas e cicatrizante.', 'Ideal para pele oleosa e acnéica. 
    Recomenda-se usar de 2 a 3 vezes por semana fazendo uma média esfoliação, não utilizar a barra diretamente 
    no rosto, fazer uma espuma com as mãos e então lavar o rosto.', 'Palma, Palmiste, Água destilada, NaOH, 
    Óleo de Semente de Uva, Óleo Rosa Mosqueta, Manteigas de Cupuaçu, Carvão Ativado, Óleo Resina de Alecrim, 
    Vitamina E, Óleo Essencial de Melaleuca, Cipreste, Tomilho. Por cold process.', 18.00, 50, 100, '2020-08-01'),
    (8, 'Sabonete para Pele Madura', 'O Óleo de Goiaba é um antioxidante, nutre e protege a pele. O Óleo de Amêndoa 
    em conjunto com a Manteiga de Cacau traz propriedades de hidratação profunda na pele. O Óleo Essencial de Lavanda 
    Francesa acalma e relaxa, trazendo bem-estar e equilíbrio.', 'Ideal para pele madura e sensível. Pode ser usado 
    diariamente no corpo e na face, ou intercalado com o Sabonete de Argila Vermelha.', 'Palma, Palmiste, Água 
    Destilada, NaOH, Óleo de Amêndoa, Óleo de Mamona, Azeite de Oliva Extra Virgem, Óleo de Goiaba, Manteiga de 
    Cacau, Óleo Resina de Alecrim, Vitamina E, Dióxido de Titânio, Óleo Essencial de Lavanda Francesa. Por cold 
    process.', 18.00, 50, 100, '2020-08-01') ;

select * from produto;

insert into pedido (id_pedido, data_pedido, id_cliente, valor_total, ativo) values (1, '2020-10-28', 2, 36, true);
insert into item (id_produto, id_pedido, qtde, valor_item) values
(1, 1, 1, 18);
insert into item (id_produto, id_pedido, qtde, valor_item) values
(2, 1, 1, 18);
select pedido.id_pedido, data_pedido, cliente.nome_cliente, produto.nome_produto, item.qtde, valor_total from pedido inner join item on pedido.id_pedido = item.id_pedido inner join cliente on cliente.id_cliente = pedido.id_cliente inner join produto on produto.id_produto = item.id_produto ;
select produto.nome_produto, item.qtde, produto.valor_produto from pedido inner join item on pedido.id_pedido = item.id_pedido inner join cliente on cliente.id_cliente = pedido.id_cliente inner join produto on produto.id_produto = item.id_produto ;

-- delete from item where id_pedido = 1;
-- delete from pedido where id_pedido = 1;
