require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const { loginRequired, ensureCorrectUser } = require('./middleware/auth');
const db = require('./models');
const graphqlHandler = require('./graphql');

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, messageRoutes);

app.get('/api/messages', loginRequired, async function (req, res, next) {
  try {
    const messages = await db.Message.find().sort({ createdAt: 'desc' }).populate('user', {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

app.use('/graphql', graphqlHandler);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});
