const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res, next) => {
  try {
    dbResult = await req.db.collection('user').findOne({ username: req.body.username });
    if (!dbResult) {
      res.sendStatus(401);
    } else {
      await bcrypt.compare(req.body.password, dbResult.password).then((result) => {
        if (result) {
          const token = jwt.sign({ _id: dbResult._id, username: dbResult.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });
          res.status(200).json({ token });
        } else res.sendStatus(401);
      });
    }
  } catch (e) {
    next(e);
  }
  next();
});

router.post('/signin', async (req, res, next) => {
  try {
    if (req.body.password.length < 6) {
      res.status(400).send('password has to be at least 6 character long');
    } else {
      await bcrypt.hash(req.body.password, parseInt(process.env.PASSWORD_SALT)).then((hash) => {
        req.body.password = hash;
      });
      await req.db
        .collection('user')
        .insertOne(req.body)
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(409));
    }
  } catch (e) {
    next(e);
  }
  next();
});

module.exports = router;
