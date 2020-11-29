const express = require("express");
const app = express();
const port = 3000;
const db = require("./db");
/* const bodyParser = require("body-parser");
 */
app.use(db.createConnection);
/* app.use(bodyParser.json());
 */
app.route("/todo").get(async (req, res) => {
  result = await req.db.collection("todo").find({}).toArray();
  res.send(result);
});

app.delete("/todo/:id", async (req, res) => {
  result = await req.db.collection("todo").find({}).toArray();
  res.send(req.params);
});

app.use(db.closeConnection);

app.listen(port, () => {
  console.log("anyád");
});
