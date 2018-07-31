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
    owner: ["5b5f36a944e3092c6d945e7e"],
    members: ["5b5f36a944e3092c6d945e7e"],
    active: true
  },
  {
    name : "Second runner group",
    description: "The second group",
    day: 0,
    hour: "8:00",
    place: "Madrid",
    owner: ["5b5f36a944e3092c6d945e7e"],
    members: ["5b5f36a944e3092c6d945e7e", "5b5f44c3101f483666f44db5"],
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