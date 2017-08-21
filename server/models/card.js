'use strict';
module.exports = function(sequelize, DataTypes) {
  var Card = sequelize.define('Card', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hint: {
      type: DataTypes.STRING
    }
  });

  // Class Methods
  Card.associate = function(models) {
    Card.belongsTo(models.Collection, {
      foreignKey: 'collectionId',
      onDelete: 'CASCADE'
    });
  };

  // Instance Methods

  // Hooks

  return Card;
};
