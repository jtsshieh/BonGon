const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

client.query(
  'DROP TABLE settings'
);
client.query(
  'DROP TABLE persons'
)
