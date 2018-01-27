/* eslint-disable */
const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');
nunjucks.configure('views', { noCache: true });
const db = require('./db');


app.set('view engine', 'html'); // sets default view as html
app.engine('html', nunjucks.render); // sets nunjucks as default render engine

app.use('/vendor', express.static(path.join(__dirname, 'node_modules'))); // hides any node modules or packages, re-routs using /vendor folder

app.use((req, res, next) => {
  res.locals.path = req.url;
  // res.locals = /
  // res.locals.path = /, /tweets, /tweets/1, - depends on URL
  next()
})

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Twitter'})
})


app.get('/tweets', (req, res, next) => {
  // db.getTweets((err, tweets) => {
  //   if (err) return next(err);
  //   res.send(tweets);
  // });
  res.render('tweets', {title: 'Tweet'})
});

app.get('/tweets/:id', (req, res, next) => {
  // db.getTweet(req.params.id, (err, user) => {
  //   if (err) return next(err)
  //   res.send(user)
  // });
  res.render('tweet', {title: `AAAahhhhh`})
});

app.use('/tweets', require('./routes/tweets'))

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})



// db.sync((err) => {
//   if (err) return console.log(err);
//   db.getTweets((err, tweets) => {
//     if (err) return console.log(err);
//     console.log(`there are ${tweets.length} tweets`);
//     db.seed((err) => {
//       if (err) return console.log(err);
//       db.getTweets((err, tweets) => {
//         if (err) return console.log(err);
//         console.log(`there are ${tweets.length} tweets`);
//         db.getTweet(2, (err, user) => {
//           if (err) return console.log(err);
//           console.log(`user with an id of 2 tweeted '${user.tweet}'`)
//         })
//       })
//     })
//   })
// });
