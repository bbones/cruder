const pg = require('pg')
const pluralize = require('pluralize')

class Cruder {
  constructor (config, dbschema, tabNameSingular = true) {
    this.pool = new pg.Pool(config)
    this.tabNameSingular = tabNameSingular
    this.dbschema = dbschema
  }

  getTabName (entityName) {
    return this.tabNameSingular ? pluralize.singular(entityName)
        : pluralize.plural(entityName)
  }

  getSentence (attrList) {
    let result = 'select '
    if (attrList) {
      attrList.map((name) => {
        result += (result === 'select ') ? name : ', ' + name
      })
    } else result += '*'
    result += ' from '
    return result
  }

  getMain (entity, options) {
    return Promise.all(
      [options, this.pool.query('select * from ' +
          this.dbschema +
          this.getTabName(entity))])
  }

  addRelated ([options, data]) {
    let promises = [options, data]
    if (options && options.relations) {
      options.relations.map((entity) =>
        promises.push(this.pool.query('select * from ' +
            this.dbschema +
            this.getTabName(entity))))
    }
    return Promise.all(promises)
  }

  get (entity, options) {
    return this.getMain(entity, options)
      .then(result => this.addRelated(result))
  }
}

module.exports = Cruder
