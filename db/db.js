const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/photoSite");

mongoose.connection.on("connected", () => {
	console.log("DB Shit be runnin")
});

mongoose.connection.on("error", () => {
	console.log("DB Shit not be runnin")
});

mongoose.connection.on("disconnected", () => {
	console.log("DB Shit be done")
});








