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
            console.log("users", users)
            group.members = users;
          })
      })
      console.log("render", groups);
      res.render('groups', { groups });
    })
    .catch(error => {
      next(error);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Group.findById(id)
    .then(group => {
      res.render('group_detail', group);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
