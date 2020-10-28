import Sql = require("../infra/sql");

export = class Cliente{

    public id_cliente: number;
    public nome_cliente: String;
    public email: String;
    public senha: String;
    public cep_cliente: number;
    public num_casa: String;
    public cidade_cliente: String;


    public static validar(cliente: Cliente): string{


        if(!cliente){
            return "Dados inválidos";
        }
        if(!cliente.nome_cliente){
            return "Nome inválido";
        }

        if(cliente.nome_cliente.length>45){
            return "Nome muito longo";
        }
        if(!cliente.email || !cliente.email.includes("@")){
            return "E-mail inválido";
        }
        if(cliente.email.length >100){
            return "Email muito longo";
        }

        return null;
    }

    public static async listar(): Promise<Cliente[]>{
        let lista: Cliente[] = null;
        await Sql.conectar(async (sql) =>{
            lista = await sql.query("select id_cliente, nome_cliente, email, cep_cliente, num_casa, cidade_cliente from cliente");
        });
        return lista;
    }

    public static async criar(cliente: Cliente): Promise<string>{
        let erro: string = Cliente.validar(cliente);
        let existente: string = null;

        if(erro){
            return erro;
        }

        await Sql.conectar(async(sql)=>{
        
            let existe = await sql.query("select nome_cliente, email, senha from cliente where email = ?",[cliente.email]);
            if(existe && existe.length){
                // existe registro
                existente = 'Esse cadastro já existe, faça login!';
            }else{
                let lista = await sql.query("insert into cliente(nome_cliente, email, senha) values (?, ?, ?) ",[cliente.nome_cliente, cliente.email, cliente.senha]);

            }
            
        });

        return existente;
    }

    public static async obter(id_cliente:number): Promise<Cliente>{
        let cliente: Cliente = null;

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("select id_cliente, nome_cliente, email from cliente where id_cliente = ?",[cliente.id_cliente]);
         
            if(lista && lista.length){
                cliente = lista[0];
            }
        });

        return cliente;

    }

    public static async login(email:String): Promise<Cliente>{
        let cliente: Cliente = null;

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("select id_cliente, nome_cliente, email, senha from cliente where email = ?",[cliente.email]);
         
            if(lista && lista.length){
                cliente = lista[0];
            }
        });

        return cliente;

    }

    
    public static async alterar(cliente: Cliente): Promise<string>{
        let erro: string = Cliente.validar(cliente);


        if(erro){
            return erro;
        }

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("update cliente set nome = ?, email = ?, senha=? where nome = ?",[cliente.nome_cliente, cliente.email, cliente.senha, cliente.nome_cliente]);
        });

        return erro;
    }

    public static async adicionarEndereco(cliente: Cliente): Promise<string>{
        let erro: string = Cliente.validar(cliente);

        if(erro){
            return erro;
        }

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("update cliente set cep_cliente = ? , num_casa = ?, cidade_cliente = ? where nome_cliente = ?",[cliente.cep_cliente, cliente.num_casa, cliente.cidade_cliente, cliente.nome_cliente]);
        });

        return erro;
    }
    

    public static async excluir(id_cliente:number): Promise<string>{
        let erro: string = null;

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("delete from cliente where id_cliente = ?",[id_cliente]);
         
            if(!sql.linhasAfetadas){
                erro = 'Cliente não encontrado';
            }
        });

        return erro;

    }

   
}