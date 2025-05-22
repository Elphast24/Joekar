// routes/routes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const itemController = require('../controllers/itemController');
const tablesController = require('../controllers/tablesController')
const purchaseController = require('../controllers/purchaseController');
const { homepage } = require('../controllers/itemController');
// router.get('/home', homepage)
// router.get('/', homepage)

// const itemController = require('../controllers/itemController');

// router.get('/', homeController.homepage);

// User Routes
router.post('/users', userController.createUser);  // POST /api/users
router.get('/users', userController.getUsers);    // GET /api/users

// Item Routes
router.post('/', itemController.createItem);  // POST /api/items
// router.get('/items', itemController.getItemsTable);    // GET /api/items

// Purchase Routes
router.post('/purchases', purchaseController.createPurchase);  // POST /api/purchases
// router.post('/reciept')
// router.get('/', purchaseController.showSales);    // GET /api/purchases
// console.log(itemController.homepage);
router.get('/', tablesController.homepage);

router.post('/login', userController.login);

// router.get('/', purchaseController.salesHomepage);


module.exports = router;

