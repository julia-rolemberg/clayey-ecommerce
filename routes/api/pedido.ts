import express = require("express");
import wrap = require("express-async-error-wrapper");
import Cliente = require("../../models/cliente");
import Pedido = require("../../models/pedido");

const router = express.Router();

router.post("/criar", wrap(async(req: express.Request, res: express.Response)=>{
	const cliente = await Cliente.cookie(req.cookies);
	if (!cliente) {
		res.status(403).json("Sem login efetuado");
		return;
	}

	let erro: string = null;

	let clienteAtualizado = req.body.cliente as Cliente;
	if (!clienteAtualizado) {
		res.status(400).json("Dados de cliente inválidos");
		return;
	}
	clienteAtualizado.id_cliente = cliente.id_cliente;

	erro = await Cliente.atualizarEndereco(clienteAtualizado);

	if (erro) {
		res.status(400).json(erro);
		return;
	}

	let produtos = req.body.produtos;

	erro = await Pedido.criar(cliente.id_cliente, produtos);

	if (erro) {
		res.status(400).json(erro);
	} else {
		res.json(true);
	}
}));
router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	const cliente = await Cliente.cookieAdmin(req.cookies);
	if (!cliente) {
		res.status(403).json("Sem login efetuado");
		return;
	}

	let lista = await Pedido.listar();

	res.json(lista);
}));

router.get("/excluir/:id", wrap(async (req: express.Request, res: express.Response) => {
	let erro: string = null;

	let id = parseInt(req.params["id"]);

	if (isNaN(id)) {
		erro = "Id inválido!";
	} else {
		erro = await Pedido.excluir(id);
	}

	if (erro) {
		res.status(400).json(erro);
	} else {
		res.json(true);
	}
}));

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
	let erro: string = null;

	let pedido = req.body as Pedido;

	erro = await Pedido.alterar(pedido);

	if (erro) {
		res.status(400).json(erro);
	} else {
		res.json(true);
	}
}));
export = router;

