const { User, Thought } = require('../models');

const userController = {
  // get all users
  // GET @ /api/users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by `id`
  // GET @ /api/users/:id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate([
        { path: 'thoughts', select: '-__v' },
        { path: 'friends', select: '-__v' }
      ])
      .select('-__v')
      .then(dbData => {
        // if no User is found
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
  // POST @ /api/users
  // EXPECTS
  //{
  //  "username": "foo",
  //  "email": foo@bar.com **MUST BE A CORRECT EMAIL**
  //}
  createUser({ body }, res) {
    User.create(body)
      .then(dbData => res.json(dbData))
      .catch(err => res.status(400).json(err));
  },

  // update a user by `id`
  // PUT @ /api/users/:id
  // EXPECTS
  //{
  //  "username": "foo",
  //  "email": "foo@bar.com" **MUST BE A CORRECT EMAIL**
  //}
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbData => {
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

  // delete a user by `id` and all their associations
  // DELETE @ /api/users/:id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        User.updateMany(
          { _id: { $in: dbData.friends } },
          { $pull: { friends: params.id } }
        )
          .then(() => {
            Thought.deleteMany({ username: dbData.username })
              .then(() => {
                res.json({ message: "User successfully deleted" });
              })
              .catch(err => res.status(400).json(err));
          })
          .catch(err => res.status(400).json(err));
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // add a friend to friends list
  // POST @ /api/users/:userId/friends/:friendId
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        // Not sure if friend adding will need to be verified from receiving user
        // 
        // User.findOneAndUpdate(
        //   { _id: params.friendId },
        //   { $addToSet: { friends: params.userId }},
        //   { new: true, runValidators: true }
        // )
        // .then(dbData => {
        //   if (!dbData) {
        //     res.status(404).json({ message: 'No user found with this id!' });
        //     return;
        //   }
        // })
        res.json(dbData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // remove a friend from friends list
  // DELETE @ /api/users/:userId/friends/:friendId
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        User.findOneAndUpdate(
          { _id: params.friendId },
          { $pull: { friends: params.userId } },
          { new: true, runValidators: true }
        )
          .then(dbData => {
            if (!dbData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json({ message: 'Friend successfully deleted' });
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          })
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  }
};

module.exports = userController;