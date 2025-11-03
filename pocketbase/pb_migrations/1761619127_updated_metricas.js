/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_502799024")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "json843238847",
    "maxSize": 0,
    "name": "valores_pesos",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_502799024")

  // remove field
  collection.fields.removeById("json843238847")

  return app.save(collection)
})
