/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_620079721")

  // update collection data
  unmarshal({
    "name": "bloco"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_620079721")

  // update collection data
  unmarshal({
    "name": "predio"
  }, collection)

  return app.save(collection)
})
