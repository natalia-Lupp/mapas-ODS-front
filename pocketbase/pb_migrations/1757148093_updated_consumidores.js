/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_511921277")

  // update collection data
  unmarshal({
    "name": "consumidores_unidade_consumo"
  }, collection)

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number3732681039",
    "max": null,
    "min": null,
    "name": "consumo_por_acionamento",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_511921277")

  // update collection data
  unmarshal({
    "name": "consumidores"
  }, collection)

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
})
