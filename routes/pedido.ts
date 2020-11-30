import express = require("express");
import wrap = require("express-async-error-wrapper");
import Cliente = require("../models/cliente");
import Pedido = require("../models/pedido");

const router = express.Router();


router.get("/criar", wrap(async (req: express.Request, res: express.Response) => {

	let opcoes = {
		pedido: null
	};

	res.render("pedido/criar", opcoes);
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	const cliente = await Cliente.cookieAdmin(req.cookies);
	if (!cliente) {
		res.redirect("/");
		return;
	}

	let lista = await Pedido.listar();

	res.render("pedido/listar", {layout:"restrito/layout", lista:lista});
}));

router.get("/alterar/:id", wrap(async (req: express.Request, res: express.Response) => {
	let id_pedido = parseInt(req.params["id"]);

	if (isNaN(id_pedido)) {
		res.render("pedido/nao-encontrado", {layout:"layout-vazio"});
	} else {
		let pedido = await Pedido.obterPorId(id_pedido);
		
		if (!pedido) {
			res.render("pedido/nao-encontrado", {layout:"layout-vazio"});
		} else {
			res.render("pedido/editar", {layout:"restrito/layout", pedido: pedido});
		}
	}
}));

export = router;
