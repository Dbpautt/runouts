const express = require('express');
const router = express.Router();

/* GET profile */
router.get('/', (req, res, next) => {
  res.send('profile page');
});

module.exports = router;