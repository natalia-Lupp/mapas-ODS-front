/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3049608540")

  // remove field
  collection.fields.removeById("number1305981102")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3049608540")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number1305981102",
    "max": null,
    "min": null,
    "name": "media_capacidade_sala",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
