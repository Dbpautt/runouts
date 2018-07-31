const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Group = require('../models/group');

/* GET users */
router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      users.forEach((group) => {
        Group.find({ members : users._id })
          .then(groups => {
            group.name = groups;
          })
      })
      
      res.render('users', { users });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.render('user_detail', user);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;

