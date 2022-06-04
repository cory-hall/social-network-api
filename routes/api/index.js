const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// add prefix for appropriate API routes
router.use('/users', userRoutes);
router.use('thoughts', thoughtRoutes);

module.exports = router;