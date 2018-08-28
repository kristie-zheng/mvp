const pg = require('pg');

// for local
const pgClient = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mvp',
  password: 'postgres',
  post: '5432',
});

pgClient.connect((err) => {
  if (err) {
    console.log('error connecting to Postgres', err);
    throw err;
  } else {
    console.log('connected to Postgres');
  }
});

