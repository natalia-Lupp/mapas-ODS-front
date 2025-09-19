/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2709880979")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number1114912523",
    "max": null,
    "min": null,
    "name": "quantidade",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2709880979")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number1114912523",
    "max": null,
    "min": null,
    "name": "quantidade",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
