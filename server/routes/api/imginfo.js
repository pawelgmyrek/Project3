const router = require('express').Router();
const userController = require('../../controllers/usersController');
const isAuthenticated = require('../../config/isAuthenticated');

// Matches with "/api/imaginfo"
router
  .route('/')
  .get(isAuthenticated, (req, res) => userController.getAllImageInfo(req, res))
  .post(isAuthenticated, (req, res) => userController.createImageInfo(req, res));

module.exports = router;
