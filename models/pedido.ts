import Sql = require("../infra/sql");

export = class Pedido{
    
    public id_pedido : number;
    public data_pedido: String; //YYYY-MM-DD
    public id_cliente: number;
    public valor_total: number; 
    public id_produto: number;
    public valor_item: number;
    public qtde: number;
    public email: String;


    public static validar(pedido: Pedido): string{

        if(!pedido){
            return "Dados inválidos";
        }
        return null;
    }
    public static async listar(): Promise<Pedido[]>{
        let lista: Pedido[] = null;
        await Sql.conectar(async (sql) =>{
            lista = await sql.query("select pedido.id_pedido, data_pedido, id_cliente, valor_total from pedido inner join item on pedido.id_pedido = item.id_pedido");
        });
        return lista;
    }
    public static async criar(pedido: Pedido): Promise<string>{
        let erro: string = Pedido.validar(pedido);
      
        if(erro){
            return erro;
        }

        await Sql.conectar(async(sql)=>{     
            let listaPedido = await sql.query("insert into pedido (id_pedido, data_pedido, id_cliente, valor_total) values (?, ?, ?, ?) ",[pedido.id_pedido, pedido.data_pedido, pedido.id_cliente, pedido.valor_total]);
            let listaItem = await sql.query("insert into item (id_produto, id_pedido, qtde, valor_item) values (?, ?, ?, ?); ",[pedido.id_produto, pedido.id_pedido, pedido.qtde, pedido.valor_item]);
        });

        return erro;
    }
    public static async obterPorEmail(email:String): Promise<Pedido>{
        let pedido: Pedido = null;

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("select pedido.id_pedido, data_pedido, pedido.id_cliente, valor_total from pedido inner join item on pedido.id_pedido = item.id_pedido inner join cliente on cliente.id_cliente = pedido.id_cliente where cliente.email = ? ",[pedido.email]);
         
            if(lista && lista.length){
                pedido = lista[0];
            }
        });

        return pedido;

    }
    public static async obterPorId(id_pedido:number): Promise<Pedido>{
        let pedido: Pedido = null;

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("select pedido.id_pedido, data_pedido, pedido.id_cliente, valor_total from pedido inner join item on pedido.id_pedido = item.id_pedido  where pedido.id_pedido = ? ",[pedido.id_pedido]);
         
            if(lista && lista.length){
                pedido = lista[0];
            }
        });

        return pedido;

    }
    public static async excluir(id_pedido:number): Promise<string>{
        let erro: string = null;
       
        await Sql.conectar(async(sql)=>{
            let listaItem = await sql.query(" delete from item where id_pedido = ?",[id_pedido]);
            let listaPedio = await sql.query(" delete from pedido where id_pedido = ?",[id_pedido]);
         
            if(!sql.linhasAfetadas){
                erro = 'Pedido não encontrado';
            }
        });

        return erro;

    }

}