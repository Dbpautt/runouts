const requireUser = (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

const requireAnon = (req, res, next) => {
  if (!req.session.currentUser) {
    next();
  } else {
    res.redirect('/books');
  }
};

module.exports = {
  requireUser,
  requireAnon
};