import express = require("express");
import wrap = require("express-async-error-wrapper");
import Cliente = require("../models/cliente");

const router = express.Router();

router.get("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let opcoes = {
		cliente: null
	};
	res.render("cliente/criar", opcoes);
}));

router.get("/adicionarEndereco", wrap(async (req: express.Request, res: express.Response) => {
	let opcoes = {
		cliente: null
	};
	res.render("cliente/adicionarEndereco", opcoes);
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	
	const cliente = await Cliente.cookieAdmin(req.cookies);
	if (!cliente) {
		res.redirect("/");
		return;
	}

	let lista = await Cliente.listar();

	let opcoes = {
		lista: lista
	};
    res.render("cliente/listar", {layout:"restrito/layout", lista:lista});
}));

export = router;
