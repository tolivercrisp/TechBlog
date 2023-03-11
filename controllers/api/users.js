const router = require("express").Router();
const {User} = require("../../models");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// route - user login
router.post("/login", async (req, res) => {
  console.log(req.body)
  const { username, password} = req.body;
  try {
    if (!username) {
      res.status(400).json({ message: "Username cannot be blank." });
      return;
    }
    const dbUserData = await User.findOne({ where: { username: username } });
    if (!dbUserData) {
      res.status(400).json({ message: "No user with that email address." });
      return;
    }
    // Checks password against stored password in DB
    const validPassword = dbUserData.checkPassword(password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password." });
      return;
    }
    // Login + save session
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      res.json({ user: dbUserData, message: "You are now logged in." });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route - user sign up
router.post("/signup", async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;
  try {
    console.log("username: " + username + " password: " + password)
    const dbUserData = await User.findOne({ where: { username: username } });
    if (dbUserData) {
      res.status(400).json({ message: "User already exists with that username!" });
      return;
    }
    console.log("username: " + username + " password: " + password)
    // create new user with username and pass
    const user = await User.create({ username, password });
    // Save session
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.json({ user, message: "You are now signed up and logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route - user logout
router.post("/logout", (req, res) => {
  // Check if user is logged in
  if (req.session.logged_in) {
    // destroy sess
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});



// routes for current user data
router.get("/users/current", (req, res) => {
    if (req.session.logged_in) {
        User.findOne({
            where: {
                id: req.session.user_id,
            }
        }).then(data => {
            res.json(data);
        });
    } else {
        res.status(404).json({
            message: "User not logged in"
        });
    }
});

// routes for current user posts
router.post("/posts", (req, res) => {
  console.log(req.body)
    if (req.session.logged_in) {
        User.findOne({
            where: {
                id: req.session.user_id,
            }
        }).then(data => {
            res.json(data);
        });
    } else {
        res.status(404).json({
            message: "User not logged in"
        });
    }
});


module.exports = router;