const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  description: String,
  day: Number,
  hour: String,
  place: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  members: Array,
  active: {type: Boolean, default: true}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;