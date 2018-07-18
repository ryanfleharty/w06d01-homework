const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

require("./db/db");

app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));


const usersController = require("./controllers/users");
const photoController =require("./controllers/photos")

app.use("/users", usersController);
app.use("/photos", photoController);

app.get("/", (req, res) => {
	res.render("index.ejs")
});


app.listen(3000, () => {
	console.log("Port 3000 is so damn active, yo!")
})



