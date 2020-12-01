const MongoClient = require('mongodb').MongoClient;

module.exports = {
  createConnection: function (req, res, next) {
    MongoClient.connect(
      `mongodb+srv://${process.env.CLUSTER_NAME}:${process.env.CLUSTER_PASSWORD}@${process.env.DB_URI}?retryWrites=true&w=majority`,
      function (err, client) {
        if (err) throw err;
        req.dbClient = client;
        req.db = client.db('todo');

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
