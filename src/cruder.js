const pg = require('pg')

class Cruder {
  constructor (config) {
    this.pool = new pg.Pool(config)
  }

  query (querystr, params) {
    return new Promise((resolve, reject) => {
      this.pool.connect((err, client, done) => {
        if (err) {
          reject(err)
          return
        }
        client.query(querystr, params, (err, result) => {
          // call `done()` to release the client back to the pool
          done()
          if (err) {
            done()
            reject(err)
            return
          }
          resolve(result)
          // output: 1
        })
      })
    })
  }

  get (entity) {
    return this.query('select * from treasury.' + entity)
  }
}

module.exports = Cruder
