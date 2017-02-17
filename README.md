# cruder

**PostgreSQL repository**


## Call example

```javascript
get(
  entity,
  {
    attributes : ['attr1', 'attr2']
    relations : [
      {
        name : 'collectionAttr', // Convention based: if singular - M:1 if plural - 1:M
        entity : ent1,
        key : [keyfields]
      }
    }],
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

getOne(
  'entity',
  5,
  {
    attributes : ['attr1', 'attr2']
    relations : [
      {
        name : 'collectionAttr', // Convention based: if singular - M:1 if plural - 1:M
        entity : ent1,
        key : [keyfields]
      }
    }],
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
)
```
