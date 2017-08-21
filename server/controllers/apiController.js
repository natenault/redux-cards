const Sequelize = require('sequelize');
const Card = require('../models').Card;
const Collection = require('../models').Collection;
const User = require('../models').User;

//===============================================
// User
//===============================================
// - NOTE: This resturns all user data including
// all associated collections and cards
exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findOne({
    userId,
    include: [
      {
        model: Collection,
        include: [
          {
            model: Card
          }
        ]
      }
    ]
  })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      console.log(err);
    });
};

//===============================================
// COLLECTIONS
//===============================================

// Get all collections for a single user (getAllCollections)
exports.getAllCollections = (req, res, next) => {
  const { userId } = req.params;
  Collection.findAll({
    where: { userId },
    include: [
      {
        model: Card,
        attributes: ['id']
      }
    ]
  })
    .then(collections => {
      res.json(collections);
    })
    .catch(err => {
      console.log(err);
    });
};

// Get single collection and cards
exports.getOneCollection = (req, res, next) => {
  const { collectionId } = req.params;
  Collection.findOne({
    where: { id: collectionId },
    include: [{ model: Card }]
  }).then(collection => {
    res.json(collection);
  });
};

// Create single collection (createCollection)
exports.createCollection = (req, res, next) => {
  const { userId } = req.params;
  let { name, description, cards } = req.body;
  Collection.create({ userId, name, description })
    .then(newCollection => {
      const cardsWithId = cards.map(card => {
        card.collectionId = newCollection.id;
        return card;
      });
      Card.bulkCreate(cardsWithId, { returning: true }).then(newCards => {
        const newCardsIds = newCards.map(card => card.id);
        Collection.findOne({
          where: { id: newCollection.id },
          include: [
            {
              model: Card,
              where: {
                id: {
                  $in: newCardsIds
                }
              }
            }
          ]
        }).then(newCollection => {
          res.json(newCollection);
        });
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Update single collection (updateCollection)
exports.updateCollection = (req, res, next) => {
  const { name, description } = req.body;
  const { collectionId } = req.params;
  Collection.update(
    { name, description },
    {
      where: { id: collectionId },
      returning: true
    }
  )
    .then(updatedCollection => {
      const collection = updatedCollection[1][0];
      res.json(collection);
    })
    .catch(err => {
      console.log(err);
    });
};

// Delete single collection (deleteCollection)
exports.deleteCollection = (req, res, next) => {
  const { collectionId } = req.params;
  Collection.destroy({ where: { id: collectionId } })
    .then(delectedCollection => {
      res.json(delectedCollection);
    })
    .catch(err => {
      console.log(err);
    });
};

//===============================================
// CARDS
//===============================================

// Get all cards for a single user (getAllCards)
exports.getAllCards = (req, res, next) => {
  const { userId } = req.params;
  Card.findAll({ where: { userId } })
    .then(cards => {
      res.json(cards);
    })
    .catch(err => {
      console.log(err);
    });
};

// Get all cards for a single collection
exports.getCollectionCards = (req, res, next) => {
  const { collectionId } = req.params;
  Card.findAll({ where: { collectionId } })
    .then(cards => {
      res.json(cards);
    })
    .catch(err => {
      console.log(err);
    });
};

// Get single card (getOneCard)
exports.getOneCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findOne({
    where: { id: cardId }
  }).then(card => {
    res.json(card);
  });
};

// Create cards
exports.createCards = (req, res, next) => {
  const { cards } = req.body;
  Card.bulkCreate(cards, { returning: true })
    .then(createdCards => {
      res.json(createdCards);
    })
    .catch(err => {
      console.log(err);
    });
};

// Update cards (updateCards)
exports.updateCards = (req, res, next) => {
  const { card } = req.body;
  const { question, answer, hint } = card;
  Card.findOne({
    where: {
      id: card.id
    }
  })
    .then(existingCard => {
      return existingCard.updateAttributes({ question, answer, hint });
    })
    .then(updatedCard => {
      res.json(updatedCard);
    })
    .catch(err => {
      console.log(err);
    });
};

// Delete single card (deleteCard)
exports.deleteCards = (req, res, next) => {
  const { cardId } = req.query;
  Card.destroy({
    where: {
      id: cardId
    }
  })
    .then(deletedCard => {
      res.json(deletedCard);
    })
    .catch(err => {
      console.log(err);
    });
};
