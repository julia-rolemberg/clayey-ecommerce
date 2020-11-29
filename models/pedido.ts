import Sql = require("../infra/sql");

class ProdutoPedido {
    public id_produto: number;
    public qtde: number;
    public valor_item: number;
}

export = class Pedido {
    
    public id_pedido : number;
    public data_pedido: String; //YYYY-MM-DD
    public id_cliente: number;
    public valor_total: number; 
    public id_produto: number;
    public valor_item: number;
    public qtde: number;
    public email: string;
    public ativo: boolean;

    public static validar(pedido: Pedido): string {
        return null;
    }

    public static async listar(): Promise<Pedido[]>{
        let lista: Pedido[] = null;
        await Sql.conectar(async (sql) =>{
            lista = await sql.query("select p.id_pedido, p.ativo, date_format(p.data_pedido, '%d/%m/%Y') data_pedido, p.id_cliente, p.valor_total,c.nome_cliente, c.email, (select group_concat(pr.nome_produto separator ', ') from item i inner join produto pr on pr.id_produto = i.id_produto where i.id_pedido = p.id_pedido) produtos, (select group_concat(i.qtde separator ', ') from item i inner join produto pr on pr.id_produto = i.id_produto where i.id_pedido = p.id_pedido) qtdes from pedido p inner join cliente c on c.id_cliente = p.id_cliente");
        });
        return lista;
    }

    public static async criar(id_cliente: number, produtos: ProdutoPedido[]): Promise<string>{
        if (!produtos || !produtos.length) {
            return "Dados inválidos";
        }

        let erro: string = null;

        await Sql.conectar(async(sql)=>{
            await sql.beginTransaction();

            let valorTotal = 0;
            for (let i = 0; i < produtos.length; i++) {
                produtos[i].qtde = parseInt(produtos[i].qtde as any);
                if (isNaN(produtos[i].qtde) || produtos[i].qtde <= 0) {
                    erro = "Quantidade inválida";
                    return;
                }
                const lista = await sql.query("select id_produto, valor_produto, qtdeDisponivel from produto where id_produto = ?", [produtos[i].id_produto]);
                if (!lista || !lista.length) {
                    erro = "Produto não encontrado";
                    return;
                }
                //if (produtos[i].qtde > lista[0].qtdeDisponivel) {
                //    erro = "Quantidade não disponível";
                //    return;
                //}
                produtos[i].valor_item = lista[0].valor_produto;
                valorTotal += produtos[i].qtde * produtos[i].valor_item;
            }
            
            await sql.query("insert into pedido (data_pedido, id_cliente, valor_total, ativo) values (now(), ?, ?, true) ",[id_cliente, valorTotal]);
            const id_pedido = await sql.scalar("select last_insert_id()") as number;

            for (let i = 0; i < produtos.length; i++) {
                await sql.query("insert into item (id_produto, id_pedido, qtde, valor_item) values (?, ?, ?, ?); ",[produtos[i].id_produto, id_pedido, produtos[i].qtde, produtos[i].valor_item]);
            }

            await sql.commit();
        });

        return erro;
    }
    public static async adicionarItem(pedido: Pedido): Promise<string>{
        let erro: string = Pedido.validar(pedido);
      
        if(erro){
            return erro;
        }

        await Sql.conectar(async(sql)=>{     
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
            let lista = await sql.query("select pedido.id_pedido, data_pedido, pedido.id_cliente, cliente.nome_cliente, valor_total from pedido inner join item on pedido.id_pedido = item.id_pedido inner join cliente on pedido.id_cliente = cliente.id_cliente where pedido.id_pedido = ? ",[pedido.id_pedido]);
         
            if(lista && lista.length){
                pedido = lista[0];
            }
        });

        return pedido;

    }

    public static async alterar(pedido: Pedido): Promise<string>{
        let erro: string = Pedido.validar(pedido);


        if(erro){
            return erro;
        }

        await Sql.conectar(async(sql)=>{
            await sql.query("update pedido set ativo = ? where id_pedido = ?",[pedido.ativo, pedido.id_pedido]);
        });

        return erro;
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
