const MongoClient = require("mongodb").MongoClient;

module.exports = {
  createConnection: function (req, res, next) {
    MongoClient.connect(
      "mongodb+srv://adigreg:3nsieeDIH4HgRMWG@todo.luua0.mongodb.net/todo?retryWrites=true&w=majority",
      function (err, client) {
        if (err) throw err;
        req.dbClient = client;
        req.db = client.db("todo");

        next();
      }
    );
  },
  closeConnection: function (req, res, next) {
    if (req.dbClient) {
      req.dbClient.close();
    }
    next();
  },
};
