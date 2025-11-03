/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3590378182")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "date1520518764",
    "max": "",
    "min": "",
    "name": "periodo_inicio",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date510363737",
    "max": "",
    "min": "",
    "name": "periodo_fim",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3590378182")

  // remove field
  collection.fields.removeById("date1520518764")

  // remove field
  collection.fields.removeById("date510363737")

  return app.save(collection)
})
