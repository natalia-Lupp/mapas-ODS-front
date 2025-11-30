/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_502799024")

  // add field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "number400171887",
    "max": null,
    "min": null,
    "name": "litros_por_total_pessoas_eventos",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(16, new Field({
    "hidden": false,
    "id": "number2914209945",
    "max": null,
    "min": null,
    "name": "litros_por_total_auxiliares_administrativos",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(17, new Field({
    "hidden": false,
    "id": "number1852549336",
    "max": null,
    "min": null,
    "name": "litros_por_total_tercerizados",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(18, new Field({
    "hidden": false,
    "id": "number1954147358",
    "max": null,
    "min": null,
    "name": "litros_por_total_docentes",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(19, new Field({
    "hidden": false,
    "id": "number1806186638",
    "max": null,
    "min": null,
    "name": "litros_por_total_alunos_geral",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(20, new Field({
    "hidden": false,
    "id": "number1471821677",
    "max": null,
    "min": null,
    "name": "litros_por_total_alunos_integral",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(21, new Field({
    "hidden": false,
    "id": "number4204298112",
    "max": null,
    "min": null,
    "name": "litros_por_total_alunos_noturnos",
    "onlyInt": false,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_502799024")

  // remove field
  collection.fields.removeById("number400171887")

  // remove field
  collection.fields.removeById("number2914209945")

  // remove field
  collection.fields.removeById("number1852549336")

  // remove field
  collection.fields.removeById("number1954147358")

  // remove field
  collection.fields.removeById("number1806186638")

  // remove field
  collection.fields.removeById("number1471821677")

  // remove field
  collection.fields.removeById("number4204298112")

  return app.save(collection)
})
