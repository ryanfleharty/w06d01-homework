const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require("./db/db");
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));

const userController = require("./controllers/users.js");
app.use("/users", userController);
const postController = require("./controllers/posts.js");
app.use("/posts", postController);

app.get("/", (req, res) => {
	res.render("index.ejs");
});

app.listen(port, () => {
	console.log("buenassss")
});