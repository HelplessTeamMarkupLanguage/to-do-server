const express = require('express');
const app = express();
const todo = require('./controllers/todo');
const user = require('./controllers/user');
const MongoClient = require('mongodb').MongoClient;
const helmet = require('helmet');
const compression = require('compression');
const auth = require('./auth-gates');
let dbClient;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(helmet());
app.use(compression());
app.use(require('cors')());
app.use(express.json());
/* app.use(express.urlencoded({ extended: true })) */

app.use((req, res, next) => {
  req.db = dbClient.db('todo');
  next();
});

app.use('/todo', auth, todo);
app.use('/user', user);

MongoClient.connect(
  `mongodb+srv://${process.env.DB_ADMIN_NAME}:${process.env.DB_ADMIN_PASSWORD}@${process.env.DB_URI}?retryWrites=true&w=majority`,
  { useUnifiedTopology: true },
  function (err, client) {
    if (err) throw err;
    dbClient = client;
    app.listen(process.env.PORT || 8080);
  }
);
