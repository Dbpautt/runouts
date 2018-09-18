const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const Group = require('../models/group');
// @review Is this const used?
const User = require('../models/user');
const notifications = require('../notifications');
const idCheckerGroup = require('../middlewares/idcheckerGroup');

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'arkhanne',
    pass: 'G0m0a1i2l2' 
  }
});

/* GET groups */
router.get('/', (req, res, next) => {
  Group.find().sort('name').select({ "name": 1}).populate('members')
    .then(groups => {
      res.render('groups', { groups });
    })
    .catch(error => {
      next(error);
    });
});

router.post('/', (req, res, next) => {
  const { filter } = req.body;
Group.find({ name: { $regex: `${filter}` } }).sort('name').populate('members')
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
  console.log(req.body);
  const { name, description, day, hour, place, geocoder } = req.body;
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
      // place = geocoder.center
      
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
  Group.find({ "$and": [{ _id: id }, { members: { "$nin": [req.session.currentUser._id] } } ] } ).populate('owner')
    .then(group => {
      if (group.length === 1) {
        group[0].members.push(req.session.currentUser._id);
        group[0].save(); 
        
        transporter.sendMail({
          from: `"${group[0].owner.username}" <${group[0].owner.email}>`,
          to: req.session.currentUser.email,
          subject: 'Runouts group information', 
          text: 'This message has been sent by runouts app',
          html: `<b>You have joined the ${group[0].name} group</b><br><br>Day: ${group[0].name}<br>Hour: ${group[0].hour}<br>Description: ${group[0].description}`
        })
        .then(info => console.log(info))
        .catch(error => console.log(error))

        transporter.sendMail({
          from: `"Runouts" <runouts@runouts.com>`,
          to: group[0].owner.email,
          subject: 'New member in your group', 
          text: 'This message has been sent by runouts app',
          html: `<b>${req.session.currentUser.username} has joined the ${group[0].name} group</b>`
        })
        .then(info => console.log(info))
        .catch(error => console.log(error))
      } else {
        req.flash('error', notifications.alreadyJoined);
        res.redirect(`/groups/${id}`);
      }
      res.redirect('/groups');
  })
  .catch(error => {
    next(error);
  })
});

router.get('/:id', idCheckerGroup, (req, res, next) => {
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


