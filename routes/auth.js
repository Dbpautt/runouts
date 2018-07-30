const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');

/* GET signup */
router.get('/signup', (req, res, next) => {
  const data = {
    messages: req.flash('message-name')
  };
  res.render('auth/signup', data);
});

/* POST signup */
router.post('/signup', (req, res, next) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email){
    req.flash('message-name', 'Fields can\'t be empty. ')
    return res.redirect('auth/signup')
  }

  User.findOne({ username })
    .then(user => {
      // user exists
      console.log(user);
      if (user) {
        req.flash('message-name', 'This username is not available.')
        return res.redirect('/auth/signup');
      } else {
        // user no exists
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = new User({ username, password: hashedPassword, email });
        req.session.currentUser = user;
        user.save();
        res.redirect('/profile');
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get('/login', (req, res, next) => {
  const data = {
    messages: req.flash('message-name')
  };
  res.render('auth/login', data);
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  if(!username || !password ) {
    req.flash('message-name', 'Write user and password.');
    return res.redirect('/auth/login');
  }
  User.findOne({ username })
    .then(user => {
      if(!user){
        req.flash('message-name', 'User or password incorrect.');
        res.redirect('/auth/login');
      }
      if(bcrypt.compareSync(password, user.password)){
        req.session.currentUser = user;
        res.redirect('/');
      } else {
        req.flash('message-name', 'User or password incorrect.');
        res.redirect('/auth/login');
      }
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/auth/login');
});

module.exports = router;
