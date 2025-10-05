/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_511921277")

  // add field
  collection.fields.addAt(4, new Field({
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

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3732681039",
    "max": null,
    "min": null,
    "name": "consumo_manual",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_511921277")

  // remove field
  collection.fields.removeById("number1114912523")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3732681039",
    "max": null,
    "min": null,
    "name": "consumo",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
