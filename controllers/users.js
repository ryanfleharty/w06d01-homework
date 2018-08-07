const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Post = require("../models/posts");
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.render("users/index.ejs", {users: allUsers});
  } catch (err) {
    res.send(err);
  }
});
router.get("/new", async (req, res) => {
  try {
    const foundUser = await User.find({});
    res.render("users/new.ejs", {users: foundUser});
  } catch (err) {
    res.send(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const foundUser = await User.findById(req.params.id);
    res.render("users/show.ejs", {user: foundUser});
  } catch (err) {
    res.send(err)
  }
});
router.get("/:id/edit", (req, res) => {
  try {
    const foundUser = User.findById(req.params.id);
    res.render("users/edit.ejs", {users: foundUser});
  } catch (err) {
    res.send(err)
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.redirect("/users");
  } catch (err) {
    res.send(err);
  }
});
router.post("/", async (req, res) => {
  try {
    const createdUser = await User.create(req.body);
    res.redirect("/users");
  } catch (err) {
    res.send(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    res.redirect("/users");
  } catch (err) {
    res.send(err);
  }
});







module.exports = router