const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/runouts');

const User = require('../models/user');

const users = [
  {
    username : "user22",
    password: "user22",
    email: "user22@user22.com",
  },
  {
    username : "user23",
    password: "user23",
    email: "user23@user23.com",
  },
];

User.create(users)
  .then((data) => {
    console.log('ok')
    mongoose.connection.close()
  })
  .catch(error => {
    console.log(error)
    mongoose.connection.close()
  });