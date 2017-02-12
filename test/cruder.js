/* global describe, it */

var assert = require('chai').assert
var Cruder = require('../src/cruder')

describe('Cruder', () => {
  const config = {
    user: 'bbones', // env var: PGUSER
    database: 'postgres', // env var: PGDATABASE
    password: 'bb', // env var: PGPASSWORD
    host: 'localhost',
    port: 5432, // env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
  }
  let cruder = new Cruder(config)
  it('Cruder created', () => {
    assert.isOk(cruder, 'Wasnt created')
  })
  it('Cruder query', () => {
    return cruder.query('SELECT $1::int AS number', ['1']).then((result) => {
      assert.equal(1, result.rows[0].number)
    })
  })

  xit('Cruder get party', () => {
    return cruder.get('party').then((result) => {
      assert.equal(7, result.rows.length)
    }).catch((err) => console.log(err))
  })

  xit('Cruder get liability', () => {
    return cruder.get('liability').then((result) => {
      assert.equal(4, result.rows.length)
    }).catch((err) => console.log(err))
  })

  it('Cruder get addRelated', () => {
    return cruder.get('liability').then(cruder.addRelated('liabilities')).then((result) => {
      assert.equal(4, result.rows.length)
      console.log(result.rows);
    }).catch((err) => console.log(err))
  })

})
