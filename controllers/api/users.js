const router = require("express").Router();
const {User} = require("../../models");
const bodyParser = require("body-parser");
router.use(bodyParser.json());

// Route to handle user login
router.post("/login", async (req, res) => {
  console.log(req.body)
  // get the username and password from the request body
  const { username, password} = req.body;
  try {
    // Check if the username is blank
    if (!username) {
      res.status(400).json({ message: "Username cannot be blank!" });
      return;
    }
    // Try to find a user with the provided username
    const dbUserData = await User.findOne({ where: { username: username } });
    if (!dbUserData) {
      // If no user is found, respond with an error message
      res.status(400).json({ message: "No user with that email address!" });
      return;
    }
    // Check if the provided password matches the hashed password in the db
    const validPassword = dbUserData.checkPassword(password);
    if (!validPassword) {
      // If the password does not match, respond with an error message
      res.status(400).json({ message: "Incorrect password!" });
      return;
    }
    // Save the session and set user_id and logged_in to true
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      // Send a successful response
      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to handle user signup
router.post("/signup", async (req, res) => {
  console.log(req.body)
  // Destructure username and password from request body
  const { username, password } = req.body;
  try {
    // Check if a user already exists with the same username
    console.log("username: " + username + " password: " + password)
    const dbUserData = await User.findOne({ where: { username: username } });
    if (dbUserData) {
      // If a user already exists, return an error message
      res.status(400).json({ message: "User already exists with that username!" });
      return;
    }
    console.log("username: " + username + " password: " + password)
    // Create new user with the provided username and password
    const user = await User.create({ username, password });
    // Save the user's session
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      // Respond with the new user object and a message indicating successful signup and login
      res.json({ user, message: "You are now signed up and logged in!" });
    });
  } catch (err) {
    // If there is an error, return a server error status and the error message
    res.status(500).json(err);
  }
});

// Route to handle user logout
router.post("/logout", (req, res) => {
  // Check if user is logged in
  if (req.session.logged_in) {
    // Destroy the session
    req.session.destroy(() => {
      // Send a successful status code indicating logout was successful
      res.status(204).end();
    });
  } else {
    // Send a status code indicating that the user is not logged in
    res.status(404).end();
  }
});


router.get("/users/current", (req, res) => {
    // Check if user is logged in
    if (req.session.logged_in) {
    // Send the user's data
        User.findOne({
            where: {
                id: req.session.user_id,
            }
        }).then(data => {
            res.json(data);
        });
    } else {
    // Send an error message indicating that the user is not logged in
        res.status(404).json({
            message: "User not logged in"
        });
    }
});

router.post("/posts", (req, res) => {
  console.log(req.body)
    // Check if user is logged in
    if (req.session.logged_in) {
    // Send the user's data
        User.findOne({
            where: {
                id: req.session.user_id,
            }
        }).then(data => {
            res.json(data);
        });
    } else {
    // Send an error message indicating that the user is not logged in
        res.status(404).json({
            message: "User not logged in"
        });
    }
});







// export the router
module.exports = router;