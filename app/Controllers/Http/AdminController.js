'use strict'

const Admin = use('App/Models/Admin')
const Aluguel = use('App/Models/Aluguel')

class AdminController {

	async index ({request}) {
    try {
      const aluguel = await Aluguel.query().orderBy('created_at', 'desc').fetch()

      return aluguel

    } catch(e) {
      
      
      return {erro: e}
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
			return {erro:e}
		}
	}

	async update({request, params}){
		const data = request.only(['status'])
		try {
			const aluguel = await Aluguel.findOrFail(params.id)
			await aluguel.merge(data)
			await aluguel.save()
			return  aluguel
		} catch(e) {
			// statements
			return {erro: e}
		}
	}


	async destroy ({params}){
		try {
			const aluguel = await Aluguel.findOrFail(params.id)
			await aluguel.delete()

			return {message: 'deletado com sucesso'}
		} catch(e) {
			
			return {erro: e}
		}
	}
}

module.exports = AdminController
