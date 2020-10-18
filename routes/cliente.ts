import express = require("express");
import wrap = require("express-async-error-wrapper");
import Cliente = require("../models/Cliente");

const router = express.Router();

router.get("/criar", wrap(async (req: express.Request, res: express.Response) => {
	let opcoes = {
		cliente: null
	};

//	res.render("cliente/editar", opcoes);
}));

router.get("/alterar/:id", wrap(async (req: express.Request, res: express.Response) => {
	let id_cliente = parseInt(req.params["id_cliente"]);

	if (isNaN(id_cliente)) {
		res.render("cliente/nao-encontrado");
	} else {
		let cliente = await Cliente.obter(id_cliente);
		
		if (!cliente) {
			res.render("cliente/nao-encontrado");
		} else {
			let opcoes = {
				cliente: cliente
			};

            console.log("página de editar clientes!")
			//res.render("cliente/editar", opcoes);
		}
	}
}));

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	let lista = await Cliente.listar();

	let opcoes = {
		lista: lista
	};
    console.log("página listando clientes")
	//res.render("cliente/listar", opcoes);
}));

export = router;