/*import express = require("express");
import wrap = require("express-async-error-wrapper");
import Produto = require("../../models/produto");

const router = express.Router();

router.get("/", wrap(async (req: express.Request, res: express.Response) => {
	res.render("produtos");
}));

router.get("/:id", wrap(async (req: express.Request, res: express.Response) => {
	let id = parseInt(req.params["id"]);
	res.render("produto/produto");

	/*if (isNaN(id)) {
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
})); */