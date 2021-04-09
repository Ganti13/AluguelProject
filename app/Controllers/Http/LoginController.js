'use strict'

const  User = use('App/Models/User')
const Admin = use('App/Models/Admin')
const bcrypt = use('bcryptjs')
const jwt = use('jsonwebtoken')

class LoginController {

	async login({request}){
		const {email, password} = request.all()

		try {
			const user = await User.findBy({email})
			if (!user) {return {message: 'invalid login'}}

			const response = await bcrypt.compare(password, user.password)

			if (!response) {return {message: 'invalid login'}}

			const token = await jwt.sign({id: user.id}, process.env.APP_KEY, {expiresIn: '1d'})

			return token

		} catch(e) {
			// statements
			return {erro: e}		
		}
	}

	async loginAdmin({request, response}){
		const {email, password} = request.all()

		try {
			const admin = await Admin.findBy({email})
			if (!admin) {return {message: 'invalid login'}}

			if (admin.password.length > 30) {

				const response = await bcrypt.compare(password, admin.password)


				if (!response) {return {message: 'invalid login'}}

				const token = await jwt.sign({id: admin.id}, process.env.APP_KEY_ADMIN, {expiresIn: '1d'})

				return token

			} 

			if (admin.password === password) {
				const token = await jwt.sign({id: admin.id}, process.env.APP_KEY_ADMIN, {expiresIn: '1d'})
				return token
			}

			


		} catch(e) {
			// statements
			return {erro: e}
		}
	}
}

module.exports = LoginController
