const mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    trim: true,
    minLength: true,
    required: true
  }
});

module.exports = { User };
