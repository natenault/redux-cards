const passport = require('passport');
const User = require('../models').User;
const Collection = require('../models').Collection;
const config = require('../env');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//===============================================
// LOCAL STRATEGY - (signing in to app)
//===============================================

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password
  // If correct, call 'done' with the user object
  // Otherwise, call 'done' with false
  User.findOne({
    where: { email },
    include: [
      {
        model: Collection,
        attributes: ['id']
      }
    ]
  })
    .then(user => {
      if (!user) {
        return done(null, false);
      } else {
        // compare password
        user.comparePassword(password, function(err, isMatch) {
          if (err) {
            return done(err);
          }

          if (!isMatch) {
            return done(null, false);
          }

          done(null, user);
        });
      }
    })
    .catch(err => {
      return done(err, false);
    });
});

//===============================================
// JWT STRATEGY - (signing in to app)
//===============================================

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// NOTE: payload has "sub" and "iat" property
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it exists, call 'done' with the user object
  // Otherwise, call 'done' without the user object
  User.findById(payload.sub)
    .then(user => {
      if (!user) {
        done(null, false);
      } else {
        done(null, user);
      }
    })
    .catch(err => {
      done(err, false);
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
