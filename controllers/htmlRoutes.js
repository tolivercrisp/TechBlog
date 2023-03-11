// Import Express and other models
const router = require("express").Router();
const bodyParser = require("body-parser");
const {User, Post} = require("../models");
router.use(bodyParser.json());

// GET (/login)
router.get("/login", (req, res) => {
  res.render("login", { req });
});

// GET (/signup)
router.get("/signup", (req, res) => {
  res.render("signup", { req });
});

// GET (/)
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      attributes: ["id", "title", "content"],
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    posts.reverse();
    res.render("homepage", { req, posts });

  } catch (err) {
    res.status(500).json(err);
  }
});


// GET (anything else, like bad requests, etc.)
router.get("*", (req, res) => {
  res.redirect("/");
});

module.exports = router;