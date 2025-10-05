/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4186239352")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number3713169819",
    "max": null,
    "min": null,
    "name": "qtd_banheiros",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4186239352")

  // remove field
  collection.fields.removeById("number3713169819")

  return app.save(collection)
})
