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

const postPets = () => {
  const queryStr =
    'INSERT INTO pet (name, gender, birthdate, species, breed, weight, microchipid) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  const values = [];
  db.query(queryStr, values, (err, data) => {
    if (err) {
      throw err;
    } else {
      callback(data.rows);
    }
  });
};

const postVaccines = () => {
  const queryStr =
    'INSERT INTO vaccinations (petid, name, frequency, lastgiven) VALUES ($1, $2, $3, $4)';
  const values = [];
  db.query(queryStr, values, (err, data) => {
    if (err) {
      throw err;
    } else {
      callback(data.rows);
    }
  });
};

const postMedications = () => {
  const queryStr =
    'INSERT INTO pet (petid, name, use, dosage, frequency) VALUES ($1, $2, $3, $4, $5)';
  const values = [];
  db.query(queryStr, values, (err, data) => {
    if (err) {
      throw err;
    } else {
      callback(data.rows);
    }
  });
};
