const db = require('../models');

// POST - /api/users/:id/messages
exports.createMessage = async function (req, res, next) {
  try {
    // create a message with the user id
    const message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });
    // find the user by id
    const foundUser = await db.User.findById(req.params.id);
    // push the message id to the user's messages array
    foundUser.messages.push(message.id);
    // save the user
    await foundUser.save();
    // send back the message with the user id
    const foundMessage = await db.Message.findById(message._id).populate(
      'user',
      {
        username: true,
        profileImageUrl: true
      }
    );
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

// GET - /api/users/:id/messages/:message_id
exports.getMessage = async function (req, res, next) {
  try {
    const message = await db.Message.findById(req.params.message_id);
    return res.status(200).json(message);
  } catch (err) {
    return next(err);
  }
};

// DELETE - /api/users/:id/messages/:message_id
exports.deleteMessage = async function (req, res, next) {
  try {
    // find the message by id
    console.log(req.params);
    const foundMessage = await db.Message.findById(req.params.message_id);
    // !! not using findByIdAndRemove because we have the pre remove hook in models/messages.js

    // remove the message
    await foundMessage.deleteOne();
    // return a success message
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};
