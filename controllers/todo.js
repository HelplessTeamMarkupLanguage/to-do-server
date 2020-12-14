const router = require('express').Router();
const ObjectId = require('mongodb').ObjectId;

router.get('', async (req, res, next) => {
  try {
    res.json(await req.db.collection('todo').find({ userId: req.userId }).sort({ date: -1 }).toArray());
  } catch (e) {
    next(e);
  }
  next();
});

router.post('', async (req, res, next) => {
  try {
    req.body.userId = req.userId;
    await req.db.collection('todo').insertOne(req.body);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
  next();
});

router.put('/:id', async (req, res, next) => {
  try {
    (
      await req.db
        .collection('todo')
        .updateOne({ _id: ObjectId(req.params.id) }, { $set: { isFinished: req.body.isFinished } })
    ).matchedCount
      ? res.sendStatus(200)
      : res.sendStatus(404);
  } catch (e) {
    next(e);
  }
  next();
});

router.delete('/:id', async (req, res, next) => {
  try {
    (await req.db.collection('todo').deleteOne({ _id: ObjectId(req.params.id) })).deletedCount
      ? res.sendStatus(200)
      : res.sendStatus(404);
  } catch (e) {
    next(e);
  }
  next();
});

module.exports = router;
