const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./../models/user');

// LocalStrategy
passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        console.log('input error');
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  },
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById({ _id: id }).then((user) => {
    done(null, user);
  }).catch(err => done(err, null));
});

// Exporting configured passport
module.exports = passport;
