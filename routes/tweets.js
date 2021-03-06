/* eslint-disable */

const app = require('express').Router();
const db = require ('../db');

app.get('/', (req, res, next) => {
  db.getTweets((err, tweets) => {
    if (err) return next(err);
    res.render('tweets', { title: 'Tweets', tweets })
  });
});

app.get('/:id', (req, res, next) => {
  db.getTweet(req.params.id, (err, user) => {
    if (err) return next(err);
    res.render('tweet', { title: `Tweet by ${user.username}`, user })
  });
});

module.exports = app;
