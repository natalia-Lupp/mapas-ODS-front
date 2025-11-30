/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_502799024")

  // remove field
  collection.fields.removeById("number29856551")

  // remove field
  collection.fields.removeById("number2800321764")

  // remove field
  collection.fields.removeById("number300763139")

  // remove field
  collection.fields.removeById("number1279968348")

  // remove field
  collection.fields.removeById("number67371889")

  // remove field
  collection.fields.removeById("number1088171242")

  // remove field
  collection.fields.removeById("date1828088084")

  // remove field
  collection.fields.removeById("date3464757613")

  // remove field
  collection.fields.removeById("number1096241876")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_502799024")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number29856551",
    "max": null,
    "min": null,
    "name": "peso_alunos_geral",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number2800321764",
    "max": null,
    "min": null,
    "name": "peso_alunos_noturno",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number300763139",
    "max": null,
    "min": null,
    "name": "peso_alunos_integral",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number1279968348",
    "max": null,
    "min": null,
    "name": "peso_aux_administrativos",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "number67371889",
    "max": null,
    "min": null,
    "name": "peso_tercerizados",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "number1088171242",
    "max": null,
    "min": null,
    "name": "peso_docentes",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "date1828088084",
    "max": "",
    "min": "",
    "name": "data_inicio_periodo",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "date3464757613",
    "max": "",
    "min": "",
    "name": "data_fim_periodo",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(14, new Field({
    "hidden": false,
    "id": "number1096241876",
    "max": null,
    "min": null,
    "name": "peso_evento",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
