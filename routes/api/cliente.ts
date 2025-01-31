import express = require("express");
import wrap = require("express-async-error-wrapper");
import Cliente = require("../../models/cliente");

const router = express.Router();

router.post("/criar", wrap(async(req: express.Request, res: express.Response)=>{
    let erro: string = null;

	let cliente = req.body as Cliente;

	erro = await Cliente.criar(cliente);

	if (erro) {
		res.status(400).json(erro);
	} else {
		res.json(true);
	}
}));

router.get("/excluir/:id", wrap(async (req: express.Request, res: express.Response) => {
	const admin = await Cliente.cookieAdmin(req.cookies);
	

	let erro: string = null;

	let id = parseInt(req.params["id"]);

	if (isNaN(id)) {
		erro = "Id inválido!";
	} else {
		erro = await Cliente.excluir(id);
	}

	if (erro) {
		res.status(400).json(erro);
	} else {
		res.json(true);
	}
}));

router.get("/obter/:id", wrap(async (req: express.Request, res: express.Response) => {
	let erro: string = null;

	let id = parseInt(req.params["id"]);

	let cliente: Cliente = null;

	if (isNaN(id)) {
		erro = "Id inválido!";
	} else {
		cliente = await Cliente.obter(id);

		if (!cliente)
			erro = "Pessoa não encontrada!";
	}

	if (erro) {
		res.status(400).json(erro);
	} else {
		res.json(cliente);
	}
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	const cliente = await Cliente.cookieAdmin(req.cookies);
	if (!cliente) {
		res.status(403).json("Sem login efetuado");
		return;
	}
	let lista = await Cliente.listar();

	res.json(lista);
}));
export = router;
