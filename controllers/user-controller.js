const { User } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by `id`
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(dbData => {
        // if not user is found
        if (!dbData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // create user
  createUser({ body }, res) {
    User.create(body)
    .then(dbData => res.json(dbData))
    .catch(err => res.status(400).json(err));
  }
};

module.exports = userController;