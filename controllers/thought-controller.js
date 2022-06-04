const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .then(dbData => res.json(dbData))
    .catch(err =>{
      console.log(err);
      res.status(400).json(err)
    });
  },

  // get one thought by `id`
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
    .then(dbData => {
      // if no Thought is found
      if (!dbData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    })
  },

  // create thought
  createThought({ params, body}, res) {
    Thought.create(body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { thoughts: _id}},
        { new: true }
      )
    })
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

  // update a thought by `id`
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate
  }
}