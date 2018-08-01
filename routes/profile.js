const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Group = require('../models/group');

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      Group.find({ members: { $in: id } })
        .then(groups => {
          console.log(req.session.currentUser);
          console.log("-------------");
          console.log(user);

          res.render('profile', { user, groups });

          // if(req.session.currentUser._id == user._id){
          //   res.render('profile', { user, groups });
          // } else{
          //   res.render('nl_profile', { user, groups });
          // }
        })
    })
    .catch(error => {
      next(error);
    });
});



module.exports = router;