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

// placeholder template to assure that querying works

// pgClient.query('SELECT * FROM reviews limit 10', (err, res) => {
//   console.log('result of query', res.rows);
//   pgClient.end();
// });

// module.exports = pgClient;

// var selectAll = function(callback) {
//   connection.query('SELECT * FROM items', function(err, results, fields) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

// module.exports.selectAll = selectAll;
