const express = require('express');
const router = express.Router();

const Group = require('../models/group');
const User = require('../models/user');

/* GET groups */
router.get('/', (req, res, next) => {
  Group.find().select({ "username": 1}).populate('members')
    .then(groups => {
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
