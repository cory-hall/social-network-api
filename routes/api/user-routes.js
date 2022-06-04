const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser
} = require('../../controllers/user-controller');

// set up GET all and POST at /api/user
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// set up GET ONE at /api/user
router
  .route('/:id')
  .get(getUserById);

  module.exports = router;

