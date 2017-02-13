# cruder

PostgreSQL repository

Call example

get(
  entity,
  {
    relations : [
      {
        name : collectionAttr,
        entity : ent1,
        key : [keyfields]
      }
    }],
    model : {
      table : table_name,
      hasMany : {name, entity, [key]}, // key can be compound
      belongsTo : {name, entity, [key]}
    },
    options : {    
      include : [ent1, ent2],
      page : [offset, limit],
      sort : [+field1, -field2],
      filter : [
        {
          field : field1,
          sign : 'lt',  // eq / lt / gt / let / get / like
          value : 'A'
        }, {
          field : field2,
          field : 'like',
          value : 'D%'
        }
      ]
    }
  }
})
