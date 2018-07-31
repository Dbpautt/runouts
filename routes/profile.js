const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Group = require('../models/group');

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      console.log(id);
      Group.find({ members: { $in: id } })
        .then(groups => {
          console.log('----', groups);
          res.render('profile', { user, groups });
        })
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;