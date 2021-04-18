'use strict'

const Model = use('Model')

class Imovel extends Model {


	user(){
		return this.belongsTo('App/Models/User')
	}


	images(){
		return this.hasMany('App/Models/Image')
	}
}

module.exports = Imovel
