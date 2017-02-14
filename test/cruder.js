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
  let cruder = new Cruder(config)
  it('Cruder created', () => {
    assert.isOk(cruder, 'Wasnt created')
  })
  it('Cruder query', () => {
    return cruder.query('SELECT $1::int AS number', ['1']).then((result) => {
      // console.log(result)
      assert.equal(1, result[0].number)
    })
  })

  it('Cruder get party', () => {
    return cruder.get('party').then(([options, data, relations]) => {
      // console.log(data)
      assert.equal(7, data.length)
    }).catch((err) => console.log(err))
  })

  it('Cruder get liability', () => {
    return cruder.get('liability').then(([options, data, relations]) => {
      // console.log(result)
      assert.equal(3, data.length)
    }).catch((err) => console.log(err))
  })

  it('Cruder get addRelated', () => {
    return cruder.get('party', {relations: ['liability', 'unit']})
      .then(([options, data, relations]) => {
        assert.equal(7, data.length)
        // console.log(options, data, relations)
      })
      .catch((err) => console.log(err))
  })
})
