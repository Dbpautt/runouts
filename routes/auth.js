const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');

/* GET signup */
router.get('/signup', (req, res, next) => {
  res.render('/auth/signup');
});

/* POST signup */
router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return res.render('auth/signup', { message: 'Fields can\'t be empty. '});
  User.findOne({ username })
    .then(user => {
      // user exists
      if (user) {
        return res.render('auth/signup', { message: 'This username is not available.' });
      } else {
        // user no exists
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const newUser = new User({ username, password: hashedPassword });
        return newUser.save();
      }
    })
    .then(user => {
      req.session.currentUser = user;
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});


module.exports = router;
