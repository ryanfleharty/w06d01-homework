const express = require("express");
const router = express.Router;
const Names = require("../models.usernames");



router.get("/", (req, res) => {

    res.render("/sec/login.ejs");

});

router.post("/login", (req, res) => {

    req.session.loggedIn = true;
    req.session.username = req.body.username;

    res.redirect("/users");

});

router.get("/logout", (req, res) => {

    req.session.destroy((err) => {
        if(err) {
            res.send(err);
        } else {
            res.redirect("/users");
        }
    });
});














module.exports = router;