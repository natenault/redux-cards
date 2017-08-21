const jwt = require('jwt-simple');
const User = require('../models').User;
const config = require('../env');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode(
    {
      sub: user,
      iat: timestamp
    },
    config.secret
  );
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  const { id, email, username, Collections } = req.user;
  const collectionIds = Collections.length ? Collections.map(c => c.id) : [];
  const userProfile = {
    userId: id,
    email: email,
    username: username,
    collections: collectionIds
  };

  res.send({ token: tokenForUser(userProfile) });
};

exports.signup = function(req, res, next) {
  const { email, username, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      error: 'You must provide email and password'
    });
  }

  // Check if user with given email exists
  User.findOne({ where: { email } })
    .then(existingUser => {
      // If a user with email does exist, return error
      if (existingUser) {
        return res.status(422).send({ error: 'Email is in use' });
      } else {
        User.create({ email, username, password })
          .then(user => {
            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
          })
          .catch(err => {
            res.send(err);
            console.error(err);
          });
      }
    })
    .catch(err => {
      res.send(err);
      console.error(err);
    });
};
