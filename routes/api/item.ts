import express = require("express");
import wrap = require("express-async-error-wrapper");
import Item = require("../../models/item");

const router = express.Router();

router.post("/criar", wrap(async(req: express.Request, res: express.Response)=>{
    
}));

export = router;
