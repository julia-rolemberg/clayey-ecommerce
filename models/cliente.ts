import { randomBytes } from "crypto";
import Sql = require("../infra/sql");

export = class Cliente{

    public static readonly NomeCookie = "usuarioClayey";

    public id_cliente: number;
    public nome_cliente: string;
    public email: string;
    public senha: string;
    public csenha: string;
    public token: string;
    public cep_cliente: number;
    public complemento: string;
    public num_casa: string;
    public rua_cliente: string
    public bairro_cliente: string;
    public cidade_cliente: string;
    public estado_cliente: string;
    public admin_cliente: number;


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
            lista = await sql.query("select id_cliente, nome_cliente, email, cep_cliente,rua_cliente, num_casa, complemento, bairro_cliente, cidade_cliente, estado_cliente from cliente");
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

            try {
                await sql.query("insert into cliente(nome_cliente, email, senha, admin_cliente) values (?, ?, ?, 0) ",[cliente.nome_cliente, cliente.email, cliente.senha]);
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
					erro = 'Esse cadastro já existe, faça login!';
				else
                    throw e;
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

    public static async cookie(cookies: any): Promise<Cliente> {
        let cliente: Cliente = null;

        const cookie = cookies[Cliente.NomeCookie] as string;
        if (!cookie || cookie.length < 64) {
            return null;
        }

        await Sql.conectar(async(sql)=>{
            const token = cookie.substr(0, 64);
            const id_cliente = cookie.substr(64);

            let lista = await sql.query("select id_cliente, nome_cliente, email, cep_cliente, rua_cliente, num_casa, complemento, bairro_cliente, cidade_cliente, estado_cliente from cliente where token = ? and id_cliente = ?",[token, id_cliente]);

            if(lista && lista.length){
                cliente = lista[0];
            }
        });

        return cliente;
    }

    public static async cookieAdmin(cookies: any): Promise<Cliente> {
        let cliente: Cliente = null;

        const cookie = cookies[Cliente.NomeCookie] as string;
        if (!cookie || cookie.length < 64) {
            return null;
        }

        await Sql.conectar(async(sql)=>{
            const token = cookie.substr(0, 64);
            const id_cliente = cookie.substr(64);

            let lista = await sql.query("select id_cliente, nome_cliente, admin_cliente from cliente where token = ? and id_cliente = ? and admin_cliente = 1",[token, id_cliente]);

            if(lista && lista.length){
                cliente = lista[0];
            }
        });

        return cliente;
    }

    public static async login(email:string, senha: string): Promise<string>{
        let cookie: string = null;

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("select id_cliente, nome_cliente, email from cliente where email = ? and senha = ?",[email, senha]);

            if(lista && lista.length){
                let cliente: Cliente = lista[0];

                // Gerar o token para confirmar o login
                const token = randomBytes(32).toString("hex");
                cookie = token + cliente.id_cliente;

                await sql.query("update cliente set token = ? where id_cliente = ?", [token, cliente.id_cliente]);
            }
        });

        return cookie;

    }

    public static async logout(id_cliente: number): Promise<void>{
        await Sql.conectar(async(sql)=>{
            await sql.query("update cliente set token = null where id_cliente = ?",[id_cliente]);
        });
    }

    public static async atualizarEndereco(cliente: Cliente): Promise<string>{
        let erro: string = Cliente.validar(cliente);

        if(erro){
            return erro;
        }

        await Sql.conectar(async(sql)=>{
            await sql.query("update cliente set cep_cliente = ? , num_casa = ?, rua_cliente=?, complemento=?, cidade_cliente = ?, bairro_cliente=?, estado_cliente=? where email = ?",[cliente.cep_cliente, cliente.num_casa,cliente.rua_cliente, cliente.complemento, cliente.cidade_cliente,cliente.bairro_cliente, cliente.estado_cliente, cliente.email]);
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
