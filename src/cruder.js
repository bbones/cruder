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

  getMain (entity, options) {
    return Promise.all(
      [options, this.query('select * from treasury.' + entity)])
  }

  addRelated ([options, data]) {
    let promises = [options, data]
    if (options && options.relations) {
      options.relations.map((name) =>
        promises.push(this.query('select * from treasury.' + name)))
    }
    return Promise.all(promises)
  }

  get (entity, options) {
    return this.getMain(entity, options)
      .then(result => this.addRelated(result))
  }
}

module.exports = Cruder
