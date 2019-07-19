const router = require('express').Router();
const userRoutes = require('./users');
const imginfoRoutes = require('./imginfo');

// API routes
router.use('/users', userRoutes);
router.use('/imginfo', imginfoRoutes);

module.exports = router;
