import Sql = require("../infra/sql");
import FS = require("../infra/fs");
import Upload = require("../infra/upload");
import converterDataISO = require("../utils/converterDataISO");

export = class Produto {
    public id_produto: number;
    public nome_produto: string;
    public desc_produto: string;
    public utilidade: string;
    public composicao: string;
    public valor_produto: number;
    public qtdeDisponivel: number;
    public peso: number;
    public fabricacao: string;
 //   public imagem: string; //rota de onde está a(s) imagem(s)

    public static validar(produto: Produto): string{
        if (!produto) {
            return "Dados inválidos";
        }

        produto.nome_produto = (produto.nome_produto || "").normalize().trim();
        if (!produto.nome_produto || produto.nome_produto.length > 45) {
            return "Nome muito longo";
        }

        produto.desc_produto = (produto.desc_produto || "").normalize().trim();
        if (!produto.desc_produto || produto.desc_produto.length > 1000) {
            return "Descrição muito longa";
        }

        produto.utilidade = (produto.utilidade || "").normalize().trim();
        if (!produto.utilidade || produto.utilidade.length > 1000) {
            return "Utilidade muito longa";
        }

        produto.composicao = (produto.nome_produto || "").normalize().trim();
        if (produto.composicao.length > 1000) {
            return "Composição muito longa";
        }

        produto.valor_produto = parseInt(produto.valor_produto as any);
        if (isNaN(produto.valor_produto) || produto.valor_produto <= 0) {
            return "Valor Inválido para o produto";
        }

        produto.qtdeDisponivel = parseInt(produto.qtdeDisponivel as any);
        if (isNaN(produto.qtdeDisponivel) || produto.qtdeDisponivel < 0) {
            return "Qtde Inválida para o produto";
        }

        produto.peso = parseInt(produto.peso as any);
        if (isNaN(produto.peso) || produto.peso < 0) {
            return "Peso Inválido para o produto";
        }

        produto.fabricacao = converterDataISO((produto.fabricacao || "") + "-01");
        if (!produto.fabricacao) {
            return "Fabricação Inválida para o produto";
        }

        return null;
    }

    private static validarImagem(imagem: any): string {
		// Vamos retornar uma string sempre que houver algum erro
		// de validação, ou null se tudo estiver OK!

		if (!imagem) {
			return "Imagem do produto faltando";
		}

		if (!imagem.buffer || !imagem.size) {
			return "Imagem do produto inválida";
		}

		if (imagem.size > (1024 * 1024)) {
			return "Imagem do produto muito grande";
		}

		return null;
	}

    public static async listar(): Promise<Produto[]>{
        let lista: Produto[] = null;
        await Sql.conectar(async (sql) =>{
            lista = await sql.query("select id_produto, nome_produto, desc_produto, utilidade, composicao, valor_produto, qtdeDisponivel, peso, date_format(fabricacao, '%m/%Y') fabricacao from produto");
        });
        return lista;
    }

    public static async criar(produto: Produto, imagem: any): Promise<string>{
        let erro: string = Produto.validar(produto);

        if(erro){
            return erro;
        }

        erro = Produto.validarImagem(imagem);
		if (erro) {
			return erro;
		}

        await Sql.conectar(async(sql)=>{
            await sql.beginTransaction();

            let lista = await sql.query("insert into Produto (nome_produto, desc_produto, utilidade, composicao, valor_produto, qtdeDisponivel, peso, fabricacao) values (?, ?, ?, ?, ?, ?, ?, ?) ", [produto.nome_produto, produto.desc_produto, produto.utilidade, produto.composicao, produto.valor_produto, produto.qtdeDisponivel, produto.peso, produto.fabricacao]);

            produto.id_produto = await sql.scalar("select last_insert_id()");

            await Upload.gravarArquivo(imagem, "public/imagens/produtos", "s" + produto.id_produto + ".jpg");

            await sql.commit();
        });

        return erro;
    }

    public static async obter(id_produto:Number): Promise<Produto>{
        let produto: Produto = null;

        await Sql.conectar(async(sql)=>{
            let lista = await sql.query("select id_produto, nome_produto, desc_produto, utilidade, composicao, valor_produto, qtdeDisponivel, peso, fabricacao from produto where id_produto = ?",[id_produto]);
         
            if(lista && lista.length){
                produto = lista[0];
            }
        });

        return produto;

    }

    public static async alterar(produto: Produto, imagem: any): Promise<string>{
        let erro: string = Produto.validar(produto);


        if(erro){
            return erro;
        }

        if (imagem) {
			erro = Produto.validarImagem(imagem);
			if (erro) {
				return erro;
			}
        }
        
        await Sql.conectar(async(sql)=>{
            await sql.beginTransaction();

            let lista = await sql.query("update produto set nome_produto = ?, desc_produto = ?, utilidade=?, composicao= ?, valor_produto=?, qtdeDisponivel=?, peso=?, fabricacao=?  where id_produto = ?",[produto.nome_produto, produto.desc_produto, produto.utilidade, produto.composicao, produto.valor_produto, produto.qtdeDisponivel, produto.peso, produto.fabricacao, produto.id_produto]);
        
            if (!sql.linhasAfetadas) {
				erro = "Produto não encontrado";
			} else if (imagem) {
				// Como a foto é opcional na edição, precisamos primeiro verificar se ela existe.
				await Upload.gravarArquivo(imagem, "public/imagens/produtos", "s" + produto.id_produto + ".jpg");
            }
            
            await sql.commit();
        });

        return erro;
    }

    public static async excluir(id_produto:Number): Promise<string>{
        let erro: string = null;

        await Sql.conectar(async(sql)=>{
            await sql.beginTransaction();

            let lista = await sql.query("delete from produto where id_produto = ?",[id_produto]);
         
            if(!sql.linhasAfetadas){
                erro = 'Produto não encontrado';
            } else {
				await FS.excluirArquivo("imagens/produtos/s" + id_produto + ".jpg");
			}

			await sql.commit();
        });

        return erro;

    }
  
}
