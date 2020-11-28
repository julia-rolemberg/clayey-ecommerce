import express = require("express");
import wrap = require("express-async-error-wrapper");
import cookieParser = require("cookie-parser");
import path = require("path");
import ejs = require("ejs");
import lru = require("lru-cache");
import Cliente = require("./models/cliente");
import Produto = require("./models/produto");

const app = express();

// Configura o diretório de onde tirar as views (páginas que serão devolvidas
// pelos tratadores das rotas)
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public"), {
	cacheControl: true,
	etag: false,
	maxAge: "30d"
}));

app.use(cookieParser());

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

app.get("/", wrap(async (req: express.Request, res: express.Response) => {
	const cliente = await Cliente.cookie(req.cookies);
	res.render("index", { cliente: cliente });
}));

app.use("/api/produto", require("./routes/api/produto"));
app.use("/produto", require("./routes/produto"));

app.use("/api/pedido", require("./routes/api/pedido"));
app.use("/pedido", require("./routes/pedido"));
app.use("/api/cliente", require("./routes/api/cliente"));
app.use("/cliente", require("./routes/cliente"));


app.get("/quiz", wrap(async(req: express.Request, res: express.Response) => {
	const cliente = await Cliente.cookie(req.cookies);
	let lista = await Produto.listar();

	res.render("quiz", {lista: lista, cliente: cliente});
}));

app.all("/login", wrap(async (req: express.Request, res: express.Response) => {
	const cliente = await Cliente.cookie(req.cookies);
	if (req.body && req.body.email && req.body.senha) {
		
		const cookie = await Cliente.login(req.body.email, req.body.senha);
		if (cookie) {
			res.cookie(Cliente.NomeCookie, cookie, { maxAge: (365 * 24 * 60 * 60 * 1000) });
			res.redirect("/");
		} else {
			res.render("login", { mensagem: "Usuário ou senha inválidos!", cliente: cliente });
		}

	} else {
		res.render("login", { mensagem: null, cliente: cliente });
	}
}));

app.get("/logout", wrap(async (req: express.Request, res: express.Response) => {
	const cliente = await Cliente.cookie(req.cookies);

	if (cliente) {
		await Cliente.logout(cliente.id_cliente);
		res.cookie(Cliente.NomeCookie, "", { expires: new Date(0) });
		res.redirect("/");
	}
}));

app.get("/cadastro", wrap(async(req: express.Request, res: express.Response) => {
	const cliente = await Cliente.cookie(req.cookies);
	res.render("cadastro", {cliente: cliente});
}));

app.get("/finalizar", wrap(async(req: express.Request, res: express.Response) => {
	const cliente = await Cliente.cookie(req.cookies);
	res.render("finalizar-compra", {cliente: cliente, layout:"layout-finalizar"});
}));


app.listen(1337, () => {
	console.log("Executando servidor na porta 1337");
});
