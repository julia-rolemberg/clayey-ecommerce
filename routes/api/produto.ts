import express = require("express");
import multer = require("multer");
import wrap = require("express-async-error-wrapper");
import Produto = require("../../models/produto");

const router = express.Router();
//listar
router.get("/", wrap(async (req: express.Request, res: express.Response) => {
	let lista = await Produto.listar();

	res.json(lista);
}));

router.post("/criar", multer().single("imagem"), wrap(async(req: express.Request, res: express.Response)=>{
    let erro: string = null;

	let produto = req.body as Produto;

	erro = await Produto.criar(produto, req["file"]);

	if (erro) {
		res.status(400).json(erro);
	} else {
		res.json(true);
	}
}));

router.get("/excluir/:id", wrap(async (req: express.Request, res: express.Response) => {
	let erro: string = null;

	let id = parseInt(req.params["id"]);

	if (isNaN(id)) {
		erro = "Id inválido!";
	} else {
		erro = await Produto.excluir(id);
	}

	if (erro) {
		res.status(400).json(erro);
	} else {
		res.json(true);
	}
}));

router.post("/alterar", multer().single("imagem"), wrap(async (req: express.Request, res: express.Response) => {
	let erro: string = null;

	let produto = req.body as Produto;

	erro = await Produto.alterar(produto, req["file"]);

	if (erro) {
		res.status(400).json(erro);
	} else {
		res.json(true);
	}
}));

export = router;