'use strict'
const Token = use('App/Models/Token')
const User = use('App/Models/User')
const {validate} = use('Validator')

class ResetPasswordController {

    async resetPassword({request, params}){
        const {password} = request.all()
        const rules = {
            password: 'required|min:6'
        }

        const messages = {
            'password.required': 'preencha uma nova senha',
            'password.min':'A senha precisa ter no minino 6 caracteres'
        }
        const validation = await validate(password,rules, messages)

        if(validation.fails()){
            return validation.messages()
        }

        try {
            const token = await Token.findBy('token', params.token)
            if(!token){return {error: 'User not found'}}
            const user = await User.findOrFail(token.user_id)
            
            await user.merge({password: password})
            await user.save()
            return user
            
        } catch (error) {
            return {error: error}
        }
    }
}

module.exports = ResetPasswordController
