const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  // GET @ /api/thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err)
      });
  },

  // get one thought by `id`
  // GET @ /api/thoughts/:id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({ path: 'reactions', select: '-__v' })
      .select('-__v')
      .then(dbData => {
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
  // POST @ /api/thoughts
  // EXPECTED
  //{
  //  "thoughtText": "foobar",
  //  "username": "foo",  **should be username that corresponds to a `user instance`**
  //  "userId": "bar"     **should be id that corresponds to username**
  //}
  createThought({ body }, res) {
    Thought.create(body)
      .then(dbData => {
        User.findOneAndUpdate(
          { _id: body.userId },
          { $addToSet: { thoughts: dbData._id } },
          { new: true, runValidators: true }
        )
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
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // update a thought by `id`
  // PUT @ /api/thoughts/:id
  // EXPECTED
  //{
  //  "thoughtText": "foobar",
  //  "username": "foo",  **should be username that corresponds to a `user instance`**
  //  "userId": "bar"     **should be id that corresponds to username
  //}
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // delete a thought by `id`
  // DELETE @ /api/thoughts/:id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        User.findOneAndUpdate(
          { username: dbData.username },
          { $pull: { thoughts: params.id } }
        )
          .then(() => {
            res.json({ message: "Thought successfully deleted" });
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
  },

  // add a reaction
  // POST @ /api/thoughts/:thoughtId/reactions
  // EXPECTED
  //{
  //  "reactionBody": "Foo",
  //  "username": "Bar"
  //}
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // delete a reaction
  // DELETE @ /api/thoughts/:thoughtId/reactions
  // body is expected to contain the reactionId from the Thought instance
  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: body.reactionId }}},
      { new: true, runValidators: true }
    )
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json({ message: 'Reaction successfully deleted' });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  }
}

module.exports = thoughtController;