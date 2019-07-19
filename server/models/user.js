const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const { Schema } = mongoose;

const User = new Schema({
  /*
    Define your user information fields for the schema here,
    DO NOT MAKE 'username' and 'password' fields,
    since passport will set those for you
  */
  pics: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Picture',
    },
  ],
});

// Set up User Schema to include passportLocalMongoose functions
User.plugin(passportLocalMongoose, {
  usernameField: 'email',
  errorMessages: {
    UserExistsError: 'A user with the given email is already registered',
  },
});

module.exports = mongoose.model('User', User);
