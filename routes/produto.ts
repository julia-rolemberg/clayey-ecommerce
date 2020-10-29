import express = require("express");
import wrap = require("express-async-error-wrapper");
import Produto = require("../models/produto");

const router = express.Router();

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {

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
	let id = parseInt(req.params["id"]);

	if (isNaN(id)) {
		res.render("produto/nao-encontrado");
	} else {
		let produto = await Produto.obter(id);

		if (!produto) {
			res.render("produto/nao-encontrado");
		} else {
			let opcoes = {
				produto: produto
			};
			
			res.render("produto/produto", opcoes);
		}
	}
}));


router.get("/", wrap(async (req: express.Request, res: express.Response) => {

	let lista = await Produto.listar();

	let opcoes = {
		lista: lista
	};
	res.render("produtos", opcoes);
}));


export = router;