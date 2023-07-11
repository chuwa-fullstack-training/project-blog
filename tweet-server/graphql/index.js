const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const jwt = require('jsonwebtoken');
const db = require('../models');

const schema = buildSchema(`
    type Query {
        hello: String
        users: [User]
        user(id: ID!): User
        messages: [Message]
        message(id: ID!): Message
        messagesByUser(userId: ID!): [Message]
        messageByUser(userId: ID!, messageId: ID!): Message
    }

    type Mutation {
        createMessage(userId: ID!, text: String!): Message
        deleteMessage(userId: ID!, messageId: ID!): Message
        signUp(email: String!, username: String!, password: String!, profileImageUrl: String): Response
        signIn(email: String!, password: String!): Response
    }

    type User {
        id: ID!
        email: String!
        username: String!
        password: String!
        profileImageUrl: String
        messages: [Message]
    }
    type Message {
        id: ID!
        text: String!
        user: User!
        createdAt: String
        updatedAt: String
    }

    type Response {
        user: User
        token: String
        message: String
    }
`);

const root = {
  hello: () => 'Hello world!',
  signUp: async ({ email, username, password, profileImageUrl }) => {
    const user = await db.User.create({
      email,
      username,
      password,
      profileImageUrl
    });
    const token = await jwt.sign(
      {
        id: user._id,
        username: user.username,
        profileImageUrl: user.profileImageUrl
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );
    return { user, token, message: 'User created successfully' };
  },
  signIn: async ({ email, password }) => {
    const user = await db.User.findOne({ email });
    if (!user) {
      throw new Error('No user with that email');
    }
    const valid = await user.comparePassword(password);
    if (!valid) {
      throw new Error('Incorrect password');
    }
    const token = await jwt.sign(
      {
        id: user._id,
        username: user.username,
        profileImageUrl: user.profileImageUrl
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );
    return { user, token, message: 'User signed in successfully' };
  },

  users: async () => await db.User.find(),
  user: async ({ id }) => await db.User.findById(id),
  messages: async (args, context) => {
    try {
      const token = context.headers?.authorization?.split(' ')?.[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded) {
        throw new Error('Unauthenticated');
      }
      return await db.Message.find()
        .sort({ createdAt: 'desc' })
        .populate('user', {
          id: true,
          username: true,
          profileImageUrl: true
        });
    } catch (err) {
      throw new Error(err.message || 'Unauthenticated');
    }
  },
  messagesByUser: async ({ userId }, context) => {
    try {
      const token = context.headers?.authorization?.split(' ')?.[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded || decoded.id !== userId) {
        throw new Error('Unauthorized');
      }
      return await db.Message.find({ user: userId }).sort({
        createdAt: 'desc'
      });
    } catch (err) {
      throw new Error(err.message || 'Unauthorized');
    }
  },
  createMessage: async ({ text, userId }, context) => {
    try {
      console.log(userId);
      const token = context.headers?.authorization?.split(' ')?.[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded || decoded.id !== userId) {
        throw new Error('Unauthorized');
      }
      const message = await db.Message.create({
        text,
        user: userId
      });

      const foundUser = await db.User.findById(userId);
      foundUser.messages.push(message.id);
      await foundUser.save();

      return await db.Message.findById(message._id).populate('user', {
        username: true,
        profileImageUrl: true
      });
    } catch (err) {
      throw new Error(
        err.message || 'Something went wrong during message creation'
      );
    }
  },
  deleteMessage: async ({ messageId, userId }, context) => {
    try {
      const token = context.headers?.authorization?.split(' ')?.[1];
      const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      if (!decoded || decoded.id !== userId) {
        throw new Error('Unauthorized');
      }
      const foundMessage = await db.Message.findById(messageId);
      await foundMessage.deleteOne();
      return foundMessage;
    } catch (err) {
      throw new Error(err.message || 'Something went wrong during deletion');
    }
  }
};

module.exports = graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
});
