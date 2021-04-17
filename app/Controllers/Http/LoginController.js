'use strict'

const  User = use('App/Models/User')
const Admin = use('App/Models/Admin')
const jwt = use('jsonwebtoken')
const Hash = use('Hash')

class LoginController {

	async login({request}){
		const {email, password} = request.all()

		try {
			const user = await User.findBy({email})
			if (!user) {return {message: 'invalid login'}}

			const response = await Hash.verify(password, user.password)

			if (!response) {return {message: 'invalid login'}}

			const token = await jwt.sign({id: user.id}, process.env.APP_KEY, {expiresIn: '1d'})

			return {type: 'Bearer', token: token}

		} catch(e) {
			// statements
			return {message: 'somenthing went wrong', erro: e}		
		}
	}

	async loginAdmin({request, response}){
		const {email, password} = request.all()

		try {
			const admin = await Admin.findBy({email})
			console.log(admin.password)
			if (!admin) {return {message: 'invalid login'}}

			if (admin.password.length > 30) {

				const response = await Hash.verify(password, admin.password)


				if (!response) {return {message: 'invalid login'}}

				const token = await jwt.sign({id: admin.id}, process.env.APP_KEY_ADMIN, {expiresIn: '1d'})

				return {type: 'Bearer', token: token}

			} 

			if (admin.password === password) {
				const token = await jwt.sign({id: admin.id}, process.env.APP_KEY_ADMIN, {expiresIn: '1d'})
				return {type: 'Bearer', token: token}
			}

		} catch(e) {
			// statements
			return {erro: e}
		}
	}
}

module.exports = LoginController
