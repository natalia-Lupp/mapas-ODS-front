/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_141138312")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "date1858616837",
    "max": "",
    "min": "",
    "name": "mes",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number940805119",
    "max": null,
    "min": null,
    "name": "metros_cubicos",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_141138312")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "date1858616837",
    "max": "",
    "min": "",
    "name": "mes",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number940805119",
    "max": null,
    "min": null,
    "name": "metros_cubicos",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
