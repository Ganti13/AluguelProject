'use strict'

const Admin = use('App/Models/Admin')
const Imovel = use('App/Models/Imovel')

class AdminController {

	async index ({request}) {
    try {
      const imovel = await Imovel.query().orderBy('created_at', 'desc').fetch()

      return imovel

    } catch(e) {
      
      
      return {erro: 'something went wrong'}
    }
  }

	async store({request}){
		const data = request.only(['name','email', 'password'])

		try {
			const check = await Admin.findBy('email', data.email)
			if (check) {return {message: 'already exists'}}
			const admin = await Admin.create(data)

			return admin
		} catch(e) {
			// statements
			return {erro:'something went wrong'}
		}
	}

	async update({request, params}){
		const data = request.only(['status'])
		try {
			const imovel = await Imovel.findOrFail(params.id)
			await imovel.merge(data)
			await imovel.save()
			return  imovel
		} catch(e) {
			// statements
			return {erro: 'something went wrong'}
		}
	}


	async destroy ({params}){
		try {
			const imovel = await Imovel.findOrFail(params.id)
			await imovel.delete()

			return {message: 'deletado com sucesso'}
		} catch(e) {
			
			return {erro: 'something went wrong'}
		}
	}
}

module.exports = AdminController
