const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/photoSite");

mongoose.connection.on("connected", () => {
	console.log("Mongoose is connected")
});

mongoose.connection.on("error", () => {
	console.log("Mongoose has failed to connect")
});

mongoose.connection.on("disconnected", () => {
	console.log("Mongoose is disconnected")
});








