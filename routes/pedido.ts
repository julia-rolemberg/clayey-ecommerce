import express = require("express");
import wrap = require("express-async-error-wrapper");
import Pedido = require("../models/pedido");

const router = express.Router();


router.get("/criar", wrap(async (req: express.Request, res: express.Response) => {

	let opcoes = {
		pedido: null
	};

	res.render("pedido/criar", opcoes);
}));

export = router;