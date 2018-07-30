const express = require('express');
const router = express.Router();

const Group = require('../models/group');
const User = require('../models/user');

/* GET groups */
router.get('/', (req, res, next) => {
  Group.find()
    .then(groups => {
      groups.forEach((group) => {
        User.find({ _id : { $in : group.members } })
          .then(users => {
            group.members = users;
          })
      })
      
      res.render('groups', { groups });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
