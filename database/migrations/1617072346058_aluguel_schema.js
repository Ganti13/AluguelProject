'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AluguelSchema extends Schema {
  up () {
    this.create('aluguels', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('titulo').notNullable()
      table.text('descricao').notNullable()
      table.boolean('status').default(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('aluguels')
  }
}

module.exports = AluguelSchema
