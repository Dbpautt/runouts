const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/runouts');

const Group = require('../models/group');

const groups = [
  {
    name : "First runner group",
    description: "The first group",
    day: 0,
    hour: "7:00",
    place: "Barcelona",
    owner: ["5b5f00cbc30b5f326061f45e"],
    members: ["5b5f00cbc30b5f326061f45e", "5b5f05a558aa2836371abf40"],
    active: true
  },
  {
    name : "Second runner group",
    description: "The second group",
    day: 0,
    hour: "8:00",
    place: "Madrid",
    owner: ["5b5f062f44cef436bc6f00c7"],
    members: ["5b5f062f44cef436bc6f00c7", "5b5f00cbc30b5f326061f45e"],
    active: true
  },
];

Group.create(groups)
  .then((data) => {
    console.log('ok')
    mongoose.connection.close()
  })
  .catch(error => {
    console.log(error)
    mongoose.connection.close()
  });