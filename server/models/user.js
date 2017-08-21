'use strict';
const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Class Methods
  User.associate = function(models) {
    User.hasMany(models.Collection, {
      foreignKey: 'userId'
    });
  };

  // Instance Methods
  User.prototype.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) {
        return callback(err);
      }

      callback(null, isMatch);
    });
  };

  // Hooks
  User.beforeCreate((user, options) => {
    return bcrypt
      .genSalt(10)
      .then(salt => {
        return bcrypt.hash(user.password, salt, null);
      })
      .then(hashed => {
        user.password = hashed;
      });
  });

  return User;
};
