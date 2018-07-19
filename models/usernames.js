const mongoose = require("mongoose");

const usernameSchema = new mongoose.model({

    username: String,
    password: String
});


module.exports = mongoose.model("Names", usernameSchema);




