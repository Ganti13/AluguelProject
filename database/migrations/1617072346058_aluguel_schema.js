'use strict'

const Schema = use('Schema')

class ImovelSchema extends Schema {
  up () {
    this.create('imoveis', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
      table.string('titulo').notNullable()
      table.text('descricao').notNullable()
      table.boolean('status').default(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('imoveis')
  }
}

module.exports = ImovelSchema
