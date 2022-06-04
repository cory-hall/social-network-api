const router = require('express').Router();
const userRoutes = require('./user-routes');

// add prefix for appropriate API routes
router.use('/user', userRoutes);

module.exports = router;