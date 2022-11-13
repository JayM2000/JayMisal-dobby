const mongoose = require('mongoose');
const crypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema;

const modeldb = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userdbs'
  },
  img: [{
    type: String
  }],
  imgname: [{
    type: String
  }]
}, {
  timestamps: true
});

const games = mongoose.model("imagedbs", modeldb);
module.exports = games;