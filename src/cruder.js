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
          resolve(result.rows)
          // output: 1
        })
      })
    })
  }

  get (entity, options) {
    return this.query('select * from treasury.' + entity)
  }

  addRelated (data, relations) {
    return new Promise((resolve, reject) => {
      resolve(data, relations)
    })
  }
}

module.exports = Cruder
