'use strict'

const jwt = use('jsonwebtoken')

class AdminAuth {


	async handle ({ request, response }, next) {

	try {
    	const authorization = request.header('authorization')

    	if (!authorization) {return response.status(401).json({message: 'invalid token'})}
    	const token = authorization.slice(7)

    	const decoded = await jwt.verify(token, process.env.APP_KEY_ADMIN)

    	if (!decoded) {return response.status(401).json({message: 'invalid token'})}
	
    	request.adminId = decoded.id	

    	await next()
		
	} catch(e) {
		return response.status(401).json({message: 'invalid token or not a admin'})
	}
  }



}

module.exports = AdminAuth
