import express = require("express");
import wrap = require("express-async-error-wrapper");
import Pedido = require("../../models/pedido");

const router = express.Router();

router.post("/criar", wrap(async(req: express.Request, res: express.Response)=>{
    let erro: string = null;

	let pedido = req.body as Pedido;

	erro = await Pedido.criar(pedido);

	if (erro) {
		res.status(400).json(erro);
	} else {
		res.json(true);
	}
}));
router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
	let lista = await Pedido.listar();

	res.json(lista);
}));

export = router;

