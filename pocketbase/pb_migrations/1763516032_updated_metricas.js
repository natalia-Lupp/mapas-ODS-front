/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_502799024")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number1567194599",
    "max": null,
    "min": null,
    "name": "consumo_total_agua",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number92041264",
    "max": null,
    "min": null,
    "name": "total_pessoas_eventos",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number3187050752",
    "max": null,
    "min": null,
    "name": "total_auxiliares_administrativos",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number1630105709",
    "max": null,
    "min": null,
    "name": "total_tercerizados",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "number1958165380",
    "max": null,
    "min": null,
    "name": "total_docentes",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "number1693114427",
    "max": null,
    "min": null,
    "name": "total_alunos_geral",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "number1159488562",
    "max": null,
    "min": null,
    "name": "total_alunos_integral",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "number1752951812",
    "max": null,
    "min": null,
    "name": "_total_alunos_noturnos_number",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_502799024")

  // remove field
  collection.fields.removeById("number1567194599")

  // remove field
  collection.fields.removeById("number92041264")

  // remove field
  collection.fields.removeById("number3187050752")

  // remove field
  collection.fields.removeById("number1630105709")

  // remove field
  collection.fields.removeById("number1958165380")

  // remove field
  collection.fields.removeById("number1693114427")

  // remove field
  collection.fields.removeById("number1159488562")

  // remove field
  collection.fields.removeById("number1752951812")

  return app.save(collection)
})
