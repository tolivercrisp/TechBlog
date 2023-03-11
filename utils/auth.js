const withAuth = (req, res, next) => {
// if the user isn't logged in, bring them to /login page
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;