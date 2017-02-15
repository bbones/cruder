/* global describe, it, xit */

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
  let cruder = new Cruder(config, 'treasury.')

  it('Cruder created', () => {
    assert.isOk(cruder, 'Wasnt created')
  })

  it('Cruder get party', () => {
    return cruder.get('party').then(([options, data, relations]) => {
      // console.log(data)
      assert.equal(data.rows.length, 7)
    }).catch((err) => console.log(err))
  })

  it('Cruder get liability', () => {
    return cruder.get('liability').then(([options, data, relations]) => {
      // console.log(result)
      assert.equal(data.rows.length, 3)
    }).catch((err) => console.log(err))
  })

  it('Cruder get addRelated', () => {
    return cruder.get('party', {relations: ['liabilities', 'unit']})
      .then(([options, data, relations]) => {
        assert.equal(data.rows.length, 7)
        assert.isOk(data.rows[0].relations)
        // console.log(options, data, relations)
      })
      .catch((err) => console.log(err))
  })
})
