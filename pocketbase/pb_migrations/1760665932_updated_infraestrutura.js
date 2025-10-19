/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3049608540")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number4277379297",
    "max": null,
    "min": 1,
    "name": "area_construida",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3049608540")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number4277379297",
    "max": null,
    "min": null,
    "name": "area_construida",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
