# cruder

PostgreSQL repository

get(
  'party',
  {
    relations : [{entity : 'liability', key_name : 'party_id'}],

    include : [ent_name],

    filter : [{field : 'name', sign : 'gt', value = 'A'}],

    page : {offset : 0, limit : 20}

    ...
  }
)
