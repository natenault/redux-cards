const apiController = require('../controllers/apiController');
const router = require('express').Router();

//===============================================
// USER
//===============================================
router.get('/user/:userId', apiController.getUser);

//===============================================
// COLLECTIONS
//===============================================

// Get all ccollections
router.get('/user/:userId/collections', apiController.getAllCollections);

// Get single collection and cards
router.get('/collections/:collectionId', apiController.getOneCollection);

// Create single collection
router.post('/user/:userId/collections', apiController.createCollection);

// Update single collection
router.put('/collections/:collectionId', apiController.updateCollection);

// Delete single collection
router.delete('/collections/:collectionId', apiController.deleteCollection);

//===============================================
// CARDS
//===============================================

// Get all cards
router.get('/user/:userId/cards', apiController.getAllCards);

// Get all cards for a single collection
router.get('/cards/:collectionId', apiController.getCollectionCards);

// Get single card
router.get('/cards/:cardId', apiController.getOneCard);

// Update cards
router.post('/cards', apiController.createCards);

// Update cards
router.put('/cards', apiController.updateCards);

// Delete cards
router.delete('/cards', apiController.deleteCards);

module.exports = router;
