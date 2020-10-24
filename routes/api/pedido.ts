import express = require("express");
import wrap = require("express-async-error-wrapper");
import Pedido = require("../../models/pedido");

const router = express.Router();

router.post("/criar", wrap(async(req: express.Request, res: express.Response)=>{
    
}));

export = router;
