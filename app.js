const express = require('express');
const app = express();
const port = 8080;
const db = require('./db');
const todo = require('./controllers/todo');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(require('cors')());
app.use(express.json());
/* app.use(express.urlencoded({ extended: true })) */
app.use(db.createConnection);

app.use('/todo', todo);

app.use(db.closeConnection);

app.listen(port);
