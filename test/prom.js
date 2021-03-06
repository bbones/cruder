var Cruder = require('../src/cruder')

const config = {
  user: 'bbones', // env var: PGUSER
  database: 'postgres', // env var: PGDATABASE
  password: 'bb', // env var: PGPASSWORD
  host: 'localhost',
  port: 5432, // env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 3000 // how long a client is allowed to remain idle before being closed
}
let cruder = new Cruder(config)

cruder.get('party', {relations : [{name: 'liabilities'}]})
  .then((result) => console.log(result.rows))
  .catch((err) => console.log(err))
