import express = require("express");
import wrap = require("express-async-error-wrapper");
import Produto = require("../models/produto");
import Cliente = require("../models/cliente");

const router = express.Router();

router.get("/", wrap(async (req: express.Request, res: express.Response) => {
	let lista = await Produto.listar();

	res.render("restrito/listar-produtos", {layout:"restrito/layout-ar", lista:lista});
}));

/*router.get("/produtos", wrap(async (req: express.Request, res: express.Response) => {
	res.render("restrito/lista-produtos", {layout:"restrito/layout-ar"});
}));*/

router.get("/clientes", wrap(async (req: express.Request, res: express.Response) => {
	let lista = await Cliente.listar();

	res.render("restrito/listar-clientes", {layout:"restrito/layout-ar", lista:lista});
}));	

export = router;