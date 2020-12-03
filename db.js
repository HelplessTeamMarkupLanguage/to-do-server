const MongoClient = require('mongodb').MongoClient;

module.exports = {
  createConnection: function (req, res, next) {
    MongoClient.connect(
      `mongodb+srv://${process.env.DB_ADMIN_NAME}:${process.env.DB_ADMIN_PASSWORD}@${process.env.DB_URI}?retryWrites=true&w=majority`,
      { useUnifiedTopology: true },
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
