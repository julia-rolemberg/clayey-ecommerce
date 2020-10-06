import Sql = require("../infra/sql");

export = class Produto {
    public id_produto: number;
    public nome_produto: string;
    public desc_produto: number;
    public modo_usar: string;
    public composicao: string;
 //   public imagem: string; //rota de onde está a(s) imagem(s)


    /*private static validar(pessoa: Pessoa): string {
        // Vamos retornar uma string sempre que houver algum erro
        // de validação, ou null se tudo estiver OK!

        if (!pessoa) {
            return "Dados inválidos";
        }

        if (!pessoa.nome) {
            return "Nome inválido";
        }

        if (pessoa.nome.length > 50) {
            return "Nome muito longo";
        }

        if (!pessoa.email || !pessoa.email.includes("@")) {
            return "E-mail inválido";
        }

        if (pessoa.email.length > 100) {
            return "E-mail muito longo";
        }

        return null;
    }

    public static async listar(): Promise<Pessoa[]> {
        let lista: Pessoa[] = null;

        await Sql.conectar(async (sql) => {

            lista = await sql.query("select id, nome, email from pessoa");

        });

        return lista;
    }

    public static async obter(id: number): Promise<Pessoa> {
        let pessoa: Pessoa = null;

        await Sql.conectar(async (sql) => {

            let lista = await sql.query("select id, nome, email from pessoa where id = ?", [id]);

            if (lista && lista.length) {
                pessoa = lista[0];
            }

        });

        return pessoa;
    }

    public static async criar(pessoa: Pessoa): Promise<string> {
        let erro: string = Pessoa.validar(pessoa);

        if (erro) {
            return erro;
        }

        await Sql.conectar(async (sql) => {

            await sql.query("insert into pessoa (nome, email) values (?, ?)", [pessoa.nome, pessoa.email]);

        });

        return erro;
    }

    public static async alterar(pessoa: Pessoa): Promise<string> {
        let erro: string = Pessoa.validar(pessoa);

        if (erro) {
            return erro;
        }

        await Sql.conectar(async (sql) => {

            await sql.query("update pessoa set nome = ?, email = ? where id = ?", [pessoa.nome, pessoa.email, pessoa.id]);

            if (!sql.linhasAfetadas) {
                erro = "Pessoa não encontrada";
            }

        });

        return erro;
    }

    public static async excluir(id: number): Promise<string> {
        let erro: string = null;

        await Sql.conectar(async (sql) => {

            await sql.query("delete from pessoa where id = ?", [id]);

            if (!sql.linhasAfetadas) {
                erro = "Pessoa não encontrada";
            }

        });

        return erro;
    } */
}