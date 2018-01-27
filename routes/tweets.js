/* eslint-disable */

const app = require('express').Router();
const db = require ('../db');

module.exports = app;

app.get('/', (req, res, next) => {
  res.render('tweets', {title: 'Tweets', tweets: db.getTweets() });
})

app.get('/:id', (req, res, next) => {
  const tweet = db.getTweet(req.params.id)
  res.render('tweet', {title: `${tweets.id}`, tweet})
})
