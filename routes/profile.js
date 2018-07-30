const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', (req, res, next) => {   // És necessari? Podem fer servir sempre /:id????? Revisar rutes a readme
  res.send('profile page');
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.render('profile', { user });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;