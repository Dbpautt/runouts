const express = require('express');
const router = express.Router();

const Group = require('../models/group');

/* GET groups */
router.get('/', (req, res, next) => {
  Group.find()
    .then(groups => {
      console.log(groups);
      res.render('groups', { groups });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
