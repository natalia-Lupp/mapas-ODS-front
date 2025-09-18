/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_141138312")

  // update collection data
  unmarshal({
    "name": "conta_sanepar"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_141138312")

  // update collection data
  unmarshal({
    "name": "conta_sanepetar"
  }, collection)

  return app.save(collection)
})
