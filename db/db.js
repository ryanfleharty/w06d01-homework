const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/user");
mongoose.connection.on("connected", () => {
	console.log("connected")
});
mongoose.connection.on("error", (err) => {
	console.log(err);
});
mongoose.connection.on("disconnected", () => {
	console.log("disconnected");
});