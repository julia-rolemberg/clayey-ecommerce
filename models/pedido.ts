import Sql = require("../infra/sql");

export = class Pedido{
    
    public id_pedido : number;
    public data_pedido: String; //YYYY-MM-DD
    public id_cliente: number;
    public valor_total: number; 

    public static validar(pedido: Pedido): string{

        if(!pedido){
            return "Dados inválidos";
        }
        return null;
    }

}