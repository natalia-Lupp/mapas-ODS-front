/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2139171082")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "date3903976193",
    "max": "",
    "min": "",
    "name": "data_leitura",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2139171082")

  // remove field
  collection.fields.removeById("date3903976193")

  return app.save(collection)
})
