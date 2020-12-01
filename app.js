const express = require('express');
const app = express();
const port = 8080;
const db = require('./db');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/* const bodyParser = require("body-parser");
 */
app.use(cors());

app.use(db.createConnection);
/* app.use(bodyParser.json());
 */
app.route('/todo').get(async (req, res) => {
  result = await req.db.collection('todo').find({}).toArray();
  res.send(result);
});

app.delete('/todo/:id', async (req, res) => {
  result = await req.db.collection('todo').find({}).toArray();
  res.send(req.params);
});

app.use(db.closeConnection);

app.listen(port, () => {
  console.log('anyád');
});
