/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3845758188")

  // update collection data
  unmarshal({
    "listRule": "",
    "viewRule": null
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3845758188")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  return app.save(collection)
})
