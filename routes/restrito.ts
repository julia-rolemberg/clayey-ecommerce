import express = require("express");
import wrap = require("express-async-error-wrapper");

const router = express.Router();

router.get("/", wrap(async (req: express.Request, res: express.Response) => {
	res.render("restrito/lista-produtos", {layout:"restrito/layout-ar"});
}));

/*router.get("/produtos", wrap(async (req: express.Request, res: express.Response) => {
	res.render("restrito/lista-produtos", {layout:"restrito/layout-ar"});
}));*/

router.get("/clientes", wrap(async (req: express.Request, res: express.Response) => {
	res.render("restrito/lista-clientes", {layout:"restrito/layout-ar"});
}));

router.get("/pedidos", wrap(async (req: express.Request, res: express.Response) => {
	res.render("restrito/lista-pedidos", {layout:"restrito/layout-ar"});
}));	

export = router;