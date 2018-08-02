const express = require('express');
const router = express.Router();

const Group = require('../models/group');
const User = require('../models/user');
const notifications = require('../notifications');

/* GET groups */
router.get('/', (req, res, next) => {
  Group.find().select({ "name": 1}).populate('members')
    .then(groups => {
      res.render('groups', { groups });
    })
    .catch(error => {
      next(error);
    });
});

/* GET addGroups */
router.get('/add', (req, res, next) => {
  res.render('add_group');
});

/* POST addGroups */
router.post('/add', (req, res, next) => {
  const { name, description, day, hour, place } = req.body;
  if (!name){
    req.flash('info', notifications.noEmptyFields)
    return res.redirect('/groups/add')
  }

  Group.findOne({ name })
  .then(group => {
    //group exists
    if(group) {
      req.flash('info', notifications.groupNoAvailable)
      return res.redirect('/groups/add');
    } else {
      //group no exists
      owner = req.session.currentUser._id;
      const members = [];
      members.push(req.session.currentUser._id);
      const group = new Group({ name, description, day, hour, place, owner, members });
      group.save();
      res.redirect('/groups');
    }
  })
  .catch(error => {
    next(error);
  })
});

/* JOIN groups */
router.post('/:id', (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Group.find({ "$and": [{ _id: id }, { members: { "$nin": [req.session.currentUser._id] } } ] } )
    .then(group => {
      if (group.length === 1) {
        group[0].members.push(req.session.currentUser._id);
        group[0].save();
      }

    res.redirect('/groups');
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


