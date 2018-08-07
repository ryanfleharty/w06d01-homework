const express = require("express");
const router = express.Router();
const Post = require("../models/posts");
const User = require("../models/users");
// index route
router.get("/", async (req, res) => {
    try {
        const foundPosts = await Post.find({});
        res.render("posts/index.ejs", {posts: foundPosts});
    } catch(err) {
        res.send(err);
    }
});
// new route
router.get("/new", async (req, res) => {
    try {
        const foundUsers = await User.find({});
        res.render("posts/new.ejs", {users: foundUsers});
    } catch(err) {
        res.send(err);
    }
});
// new post route
router.post("/", async (req, res) => {
    try {
        const foundUser = await User.findById(req.body.userId);
        const createdPost = await Post.create(req.body);
        foundUser.posts.push(createdPost);
        const savedData = await foundUser.save();
        res.redirect("/posts");
    } catch(err){
        res.send(err);
    }
});
// show route
router.get("/:id", async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.id);
        const foundUser = await User.findOne({"posts._id": req.params.id}).exec();
        console.log(foundUser)
        res.render("posts/show.ejs", {post: foundPost, user: foundUser});
    } catch(err) {
        res.send(err);
    }
});
// edit route
router.get("/:id/edit", async (req, res) => {
    try {
        const foundPost = await Post.findById(req.params.id);
        const allUsers = await User.find({});
        console.log(allUsers);
        const foundPostUser = User.findOne({"posts._id": req.params.id});
        res.render("posts/edit.ejs", {post: foundPost, users: allUsers, postUser: foundPostUser});
    } catch (err) {
        res.send(err);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const foundPost = await Post.findbyIdAndRemove(req.params.id, req.body, {new: true});
        const foundUser = await  User.findOne({"posts._id": req.params.id});
        foundUser.posts.id(req.params.id).remove();
        const savedData = await foundUser.save();
        res.redirect("/posts");
    } catch (err) {
        res.send(err);
    }   
});
router.put("/:id", async (req, res) => {
    const updatedPost = Post.findbyIdAndUpdate(req.params.id, req.body, {new: true});
    const foundUser = await User.findOne({"posts._id": req.params.id});
        if (foundUser._id.toString() !== req.body.userId) {
            foundUser.articles.id(req.params.id).remove();
            let savedFoundUser = await foundUser.save();
            const newUser = await User.findById(req.body.userId);
            newUser.posts.push(updatedPost);
            savedFoundUser = await newUser.save();
            res.redirect("/posts");
        } else {
            foundUser.posts.id(req.params.id).remove();
            foundUser.posts.push(updatedPost);
            const savedData = await foundUser.save();
            res.redirect("/posts");
        }
});












module.exports = router