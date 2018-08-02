const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');
const notifications = require('../notifications');

const uploadCloud = require('../config/cloudinary');


/* GET signup */
router.get('/signup', (req, res, next) => {
  
  res.render('auth/signup');
});

/* POST signup */
router.post('/signup', uploadCloud.single('imgPath'), (req, res, next) => {
  const { username, password, email } = req.body;
  console.log(req.file)
  // if (req.file) {
    const imgPath = req.file.url;
    const imgName = req.file.originalname;
  // }
  

  if (!username || !password || !email){
    req.flash('info', notifications.noEmptyFields)
    return res.redirect('/auth/signup')
  }

  User.findOne({ username })
    .then(user => {
      // user exists
      if (user) {
        req.flash('info', notifications.userAlreadyTaked)
        return res.redirect('/auth/signup');
      } else {
        // user no exists
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);
        const user = new User({ username, password: hashedPassword, email, imgPath, imgName });
        req.session.currentUser = user;
        user.save();
        res.redirect(`/profile/${user._id}`);
      }
    })
    .catch(error => {
      next(error);
    });
});

router.get('/login', (req, res, next) => {
  const data = {
    messages: req.flash('info')
  };
  res.render('auth/login', data);
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  if(!username || !password ) {
    req.flash('info', notifications.require);
    return res.redirect('/auth/login');
  }
  User.findOne({ username })
    .then(user => {
      if(!user){
        req.flash('info', notifications.incorrectLogin);
        return res.redirect('/auth/login');
      }
      if(bcrypt.compareSync(password, user.password)){
        req.session.currentUser = user;
        res.redirect('/');
      } else {
        req.flash('info', notifications.incorrectLogin);
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
