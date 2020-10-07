import Sql = require("../infra/sql");

export = class Produto {
    public id_produto: number;
    public nome_produto: string;
    public desc_produto: string;
    public modo_usar: string;
    public composicao: string;
    public valor_produto: number;
 //   public imagem: string; //rota de onde está a(s) imagem(s)

    public static validar(produto: Produto): string{


        if(!produto){
            return "Dados inválidos";
        }
        if(!produto.id_produto){
            return "ID inválido";
        }

        if(produto.nome_produto.length>45){
            return "Nome muito longo";
        }
        if(produto.desc_produto.length>100){
            return "Descrição muito longa";
        }
        if(produto.modo_usar.length>100){
            return "Modo de usar muito longo";
        }
        if(produto.composicao.length>100){
            return "Composição muito longa";
        }
        if(produto.valor_produto<=0){
            return "Valor Inválido para o produto";
        }

        return null;
    }

    public static async listar(): Promise<Produto[]>{
        let lista: Produto[] = null;
        await Sql.conectar(async (sql) =>{
            lista = await sql.query("select id_produto, nome_produto, desc_produto, modo_usar, composicao, valor_produto from produto");
        });
        return lista;
    }

    public static async criar(produto: Produto): Promise<string>{
        let erro: string = Produto.validar(produto);

        if(erro){
            return erro;
        }

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("insert into Produto (nome_produto, desc_produto, modo_usar,composicao,valor_produto) values ?, ?, ?, ?, ? ", [produto.nome_produto, produto.desc_produto, produto.modo_usar, produto.composicao, produto.valor_produto]);
        });

        return erro;
    }

    public static async obter(id_produto:String): Promise<Produto>{
        let produto: Produto = null;

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("select id_produto, nome_produto, desc_produto, modo_usar, composicao, valor_produto from produto where id_produto = ?",[produto.id_produto]);
         
            if(lista && lista.length){
                produto = lista[0];
            }
        });

        return produto;

    }

    public static async alterar(produto: Produto): Promise<string>{
        let erro: string = Produto.validar(produto);


        if(erro){
            return erro;
        }

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("update produto set nome_produto = ?, desc_produto = ?, modo_usar=?, composicao= ?, valor_produto=?  where id_produto = ?",[produto.nome_produto, produto.desc_produto, produto.modo_usar, produto.composicao, produto.valor_produto, produto.id_produto]);
        });

        return erro;
    }

    public static async excluir(id_produto:String): Promise<string>{
        let erro: string = null;

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("delete from produto where id_produto = ?",[id_produto]);
         
            if(!sql.linhasAfetadas){
                erro = 'Pessoa não encontrada';
            }
        });

        return erro;

    }
  
}