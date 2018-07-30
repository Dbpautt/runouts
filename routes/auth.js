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
        const newUser = new User({ username, password: hashedPassword, email });
        newUser.save()
          .then(user => {
            req.session.currentUser = user;
            res.redirect('/profile');
          });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get('/login', (req, res, next) => {
  res.render('auth/login');
});


module.exports = router;
