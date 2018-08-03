const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Group = require('../models/group');
const idCheckUser = require('../middlewares/idcheckerUser');

router.get('/:id', idCheckUser, (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      Group.find({ members: { $in: id } })
        .then(groups => {
          res.render('profile', { user, groups });
        })
    })
    .catch(error => {
      next(error);
    });
});



module.exports = router;