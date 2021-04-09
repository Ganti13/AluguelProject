'use strict'

const jwt = use('jsonwebtoken')

class AuthUser {
  
  async handle ({ request, response }, next) {
    const authorization = request.header('authorization')
    if (!authorization) {return response.status(401).json({message: 'invalid token'})}
    const token = authorization.slice(7)

    const decoded = await jwt.verify(token, process.env.APP_KEY)

    if (!decoded) {return response.status(401).json({message: 'invalid token'})}

    request.userId = decoded.id	

    await next()
  }
}

module.exports = AuthUser
