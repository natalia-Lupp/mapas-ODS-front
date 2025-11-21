/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_502799024")

  // add field
  collection.fields.addAt(22, new Field({
    "hidden": false,
    "id": "date1828088084",
    "max": "",
    "min": "",
    "name": "data_inicio_periodo",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(23, new Field({
    "hidden": false,
    "id": "date3464757613",
    "max": "",
    "min": "",
    "name": "data_fim_periodo",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_502799024")

  // remove field
  collection.fields.removeById("date1828088084")

  // remove field
  collection.fields.removeById("date3464757613")

  return app.save(collection)
})
