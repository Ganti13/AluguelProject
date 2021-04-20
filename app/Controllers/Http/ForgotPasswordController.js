'use strict'

const nodeMailer = use('nodemailer')
const crypto = use('crypto')
const User = use('App/Models/User')

class ForgotPasswordController {
    async emailReset({request}){
        
        const {email} = request.all()
        try {
            const transporter = nodeMailer.createTransport({
                host:'smtp.mailtrap.io',
                port: process.env.PORT_RESET_PASSWORD,
                auth:{
                    user: process.env.USER_RESET_PASSWORD,
                    pass:process.env.PASSWORD_RESET_PASSWORD
                }
            })
    
            const token = await crypto.randomBytes(20).toString("HEX")
    
            const user = await User.findBy({email})
            
            await user.tokens().create({
                token: token,
                type: 'forgotPassword'
            })
    
            await transporter.sendMail({
                from: process.env.EMAIL_RESET,
                to: email,
                subject: 'redefina sua senha',
                html:  `clique no link abaixo para redefinir sua senha <br>
                        <a href='http://localhost:3333/reset/${token}'>REDEFINIR SENHA</a
                `
            }, (err)=>{
                if (err) {
                    console.log(err);
                } else {
                    console.log('Email enviado com sucesso');
                }
            })
            
        } catch (error) {
            return {error: error}
        }
        
    }

}

module.exports = ForgotPasswordController
