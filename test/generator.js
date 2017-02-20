const pg = require('pg')

const config = {
  user: 'bbones', // env var: PGUSER
  database: 'postgres', // env var: PGDATABASE
  password: 'bb', // env var: PGPASSWORD
  host: 'localhost',
  port: 5432, // env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 3000 // how long a client is allowed to remain idle before being closed
}

var pool = new pg.Pool(config)

function* main () {
  var client = yield pool.connect()
  try {
    var result = yield client.query('SELECT $1::text as name', ['foo'])
    yield console.log(result)
    // yield client.query('INSERT INTO something(name) VALUES($1)', [result.rows[0].name])
    client.release()
  } catch (e) {
    // pass truthy value to release to destroy the client
    // instead of returning it to the pool
    // the pool will create a new client next time
    // this will also roll back the transaction within postgres
    client.release(true)
  }
}

main().next()
main().next()
main().next()
