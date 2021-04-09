'use strict'

const User = use('App/Models/User')
const {validate} = use('Validator')

class UserController {
	async store({request}){
		const data = request.only(['username','email','password', 'phone'])

		const rules = {
			username: 'required|min:2',
			email: 'required|unique:users|email',
			password: 'required|min:6',
			phone: 'required'
		}

		const messages = {
			'username.required': 'insira um nome valido',
			'username.min': 'nome muito curto',
			'email.required': 'digite um email',
			'email.unique': 'email ja cadastrado',
			'email.email': 'digite um email valido',
			'password.required': 'digite uma senha',
			'password.min': 'senha muita curta',
			'phone.required': 'digite um numero de telefone'
		}

		const validation = await validate(data, rules, messages)

		if (validation.fails()) {
			return {erro: validation.messages()}
		}

		try {
			const user = await User.create(data)
			return user
		} catch(e) {
			// statements
			return {erro: e}
		}
	}


	async update({request, params}){
		const data = request.only(['username', 'email', 'password', 'phone'])

		if (params.id !== request.userId) {return {erro: 'not allowed'}}

		const rules = {
			username: 'required|min:2',
			email: 'required|unique:users|email',
			password: 'required|min:6',
			phone: 'required'
		}

		const messages = {
			'username.required': 'insira um nome valido',
			'username.min': 'nome muito curto',
			'email.required': 'digite um email',
			'email.unique': 'email ja cadastrado',
			'email.email': 'digite um email valido',
			'password.required': 'digite uma senha',
			'password.min': 'senha muita curta',
			'phone.required': 'digite um numero de telefone'
		}

		const validation = await validate(data, rules, messages)

		if (validation.fails()) {
			return {erro: validation.messages()}
		}


		try {
			
			const user = await User.findOrFail(params.id)
			await user.merge(data)
			await user.save()
			return user

		} catch(e) {
			// statements
			return {erro: 'something went wrong'}
		}
	}


	async destroy({params, request}){
		if (params.id !== request.userId) {return {erro: 'not allowed'}}
		try {
			const user = await User.findOrFail(params.id)

			await user.delete()
			return {message:'deletado com sucesso'}
		} catch(e) {
			// statements
			return {erro: 'something went wrong'}
		}
	}
}

module.exports = UserController
