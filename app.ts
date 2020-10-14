import express = require("express");
import path = require("path");
import ejs = require("ejs");
import lru = require("lru-cache");

const app = express();

// Configura o diretório de onde tirar as views (páginas que serão devolvidas
// pelos tratadores das rotas)
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public"), {
	cacheControl: true,
	etag: false,
	maxAge: "30d"
}));

// Configura o Express para reconhecer dados provenientes do corpo das requisições
// http://expressjs.com/en/api.html#express.json
// http://expressjs.com/en/api.html#express.urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura o cache, para armazenar as 200 últimas páginas já processadas, por ordem de uso
ejs.cache = lru(200);
// Define o view engine como o ejs e importa o express-ejs-layouts
// https://www.npmjs.com/package/express-ejs-layouts, pois o ejs não
// suporta layouts nativamente: https://www.npmjs.com/package/ejs#layouts
app.set("view engine", "ejs");
app.use(require("express-ejs-layouts"));

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
	res.header("Expires", "-1");
	res.header("Pragma", "no-cache");
	next();
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// @@@ Preencher aqui!!!
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

app.get("/", (req: express.Request, res: express.Response) => {
	res.render("index");
});

app.use("/produtos", require("./routes/api/produto"));

app.use("/pedido", require("./routes/api/pedido"));
app.use("/cliente", require("./routes/api/cliente"));
app.use("/item", require("./routes/api/item"));


app.get("/quiz", (req: express.Request, res: express.Response) => {
	res.render("quiz");
});

app.get("/login", (req: express.Request, res: express.Response) => {
	res.render("login");
});
app.get("/cadastro", (req: express.Request, res: express.Response) => {
	res.render("cadastro");
});
app.get("/finalizar", (req: express.Request, res: express.Response) => {
	res.render("finalizar-compra");
});


app.listen(1337, () => {
	console.log("Executando servidor na porta 1337");
});
