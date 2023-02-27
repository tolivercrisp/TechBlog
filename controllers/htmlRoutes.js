// importing the express router, which allows for the creation of modular, mountable route handlers
const router = require("express").Router();
const bodyParser = require("body-parser");
const {User, BlogPost} = require("../models");
router.use(bodyParser.json());






// create a GET endpoint for the root route ('/login')
router.get("/login", (req, res) => {
  res.render("login", { req });
});

// create a GET endpoint for the root route ('/signup')
router.get("/signup", (req, res) => {
  res.render("signup", { req });
});

// create a GET endpoint for the root route ('/')
router.get("/", async (req, res) => {

  try {
    const dbPostData = await BlogPost.findAll({
      attributes: ["id", "title", "content"],
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    posts.reverse();
    res.render("homepage", { req, posts });

  } catch (err) {
    res.status(500).json(err);
  }
});


// create a catch-all GET endpoint for any other route
router.get("*", (req, res) => {
  res.redirect("/");
});

// export the router
module.exports = router;