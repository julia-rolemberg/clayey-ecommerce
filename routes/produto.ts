import express = require("express");
import wrap = require("express-async-error-wrapper");
import Produto = require("../models/produto");
import Cliente = require("../models/cliente");

const router = express.Router();

router.get("/criar", wrap(async (req: express.Request, res: express.Response) => {

	res.render("produto/editar", {layout:"restrito/layout", produto: null});
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {

	const cliente = await Cliente.cookieAdmin(req.cookies);
	if (!cliente) {
		res.redirect("/");
		return;
	}

	let lista = await Produto.listar();

	res.render("produto/listar", {layout:"restrito/layout", lista:lista});
}));

router.get("/alterar/:id", wrap(async (req: express.Request, res: express.Response) => {
	let id_produto = parseInt(req.params["id"]);

	if (isNaN(id_produto)) {
		res.render("produto/nao-encontrado");
	} else {
		let produto = await Produto.obter(id_produto);
		
		if (!produto) {
			res.render("produto/nao-encontrado");
		} else {
			res.render("produto/editar", {layout:"restrito/layout", produto: produto});
		}
	}
}));
router.get("/:id", wrap(async (req: express.Request, res: express.Response) => {
	const cliente = await Cliente.cookie(req.cookies);
	let id = parseInt(req.params["id"]);

	if (isNaN(id)) {
		res.render("produto/nao-encontrado");
	} else {
		let produto = await Produto.obter(id);

		if (!produto) {
			res.render("produto/nao-encontrado");
		} else {
			let opcoes = {
				produto: produto,
				cliente: cliente
			};
			
			res.render("produto/produto", opcoes);
		}
	}
}));


router.get("/", wrap(async (req: express.Request, res: express.Response) => {
	const cliente = await Cliente.cookie(req.cookies);
	let lista = await Produto.listar();

	let opcoes = {
		lista: lista,
		cliente: cliente
	};
	res.render("produtos", opcoes);
}));


export = router;