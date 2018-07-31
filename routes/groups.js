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

/* GET addGroups */
router.get('/add', (req, res, next) => {
  const data = {
    messages: req.flash('message-name')
  };
  res.render('add_group', data);
});

/* POST addGroups */
router.post('/add', (req, res, next) => {
  const { name, description, day, hour, place } = req.params;
  
  Group.findOne({ name })
  .then(group => {
    //group exists
    if(group) {
      req.flash('message-name', 'This group name is not available.')
      return res.redirect('add_group');
    } else {
      //group no exists
      owner = req.session.currentUser;
      const members = [];
      members.push(req.session.currentUser);
      const group = new Group({ name, description, day, hour, place, owner, members });
      group.save();
      res.redirect('/groups');
    }
  })
  .catch(error => {
    next(error);
  })
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


