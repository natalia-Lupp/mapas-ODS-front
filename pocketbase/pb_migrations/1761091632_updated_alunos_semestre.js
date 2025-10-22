/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3845758188")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number3718341724",
    "max": null,
    "min": null,
    "name": "quantidade_alunos_integral",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number1887644849",
    "max": null,
    "min": null,
    "name": "quantidade_alunos_noturnos",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3028855148",
    "max": 0,
    "min": 0,
    "name": "nome_semestre",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number3295499439",
    "max": null,
    "min": null,
    "name": "quantidade_alunos_geral",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3845758188")

  // remove field
  collection.fields.removeById("number3718341724")

  // remove field
  collection.fields.removeById("number1887644849")

  // remove field
  collection.fields.removeById("text3028855148")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "number3295499439",
    "max": null,
    "min": null,
    "name": "quantidade_alunos",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
