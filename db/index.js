// console.log(process.env.DATABASE_URL)

const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);

client.connect()

const SQL_CREATE = `
  DROP TABLE IF EXISTS tweets;
  CREATE TABLE tweets (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  tweet VARCHAR(280));
`;

const SQL_SEED = `
  INSERT INTO tweets (username, tweet) VALUES ('foo', 'this is my first tweet');
  INSERT INTO tweets (username, tweet) VALUES ('bar', 'whats going on everybody');
  INSERT INTO tweets (username, tweet) VALUES ('baz', 'wow, this is a great show');
`;

const sync = (cb) => {
  client.query(SQL_CREATE, cb)
}

const seed = (cb) => {
  client.query(SQL_SEED, cb)
}

const getTweets = (cb) => {
  client.query(`select * from tweets`, (err, result) => {
    if (err) return cb(err);
    cb(null, result.rows)
  });
}

const getTweet = (id, cb) => {
  client.query(`select * from tweets where id = $1`, [id], (err, result) => {
    if (err) cb(err);
    cb(null, result.rows.length ? result.rows[0] : null);
  })
}

module.exports = {
  getTweets,
  getTweet,
  sync,
  seed
}
