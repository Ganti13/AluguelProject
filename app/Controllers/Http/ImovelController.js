'use strict'


const Imovel = use('App/Models/Imovel')
const { validate } = use('Validator')

class ImovelController {
  
  async index ({request}) {

    try {
      const imovel = await Imovel.query().where('user_id', request.userId).with('images').fetch()

      return imovel

    } catch(e) {
      
      
      return {message: 'something went wrong'}
    }
  }

 
  async store ({ request}) {

    const data = request.only(['titulo','descricao'])
    const id = request.userId


    const rules = {
      titulo: 'required|min:3|max:50',
      descricao: 'required|min:10'
    }

    const messages = {
      'titulo.required': 'titulo invalido',
      'titulo.min': 'titulo muito curto',
      'titulo.max': 'titulo muito grande',
      'descricao.required': 'descrição invalida',
      'descricao.min': 'descrição muito curta'
    }

    const validation = await validate(data, rules, messages)
    if (validation.fails()) {
      return {erro: validation.messages()}
    }

    try {
      const imovel = await Imovel.create({...data, user_id: id})
      return imovel  
    } catch(e) {
      
      return {message: 'something went wrong', erro: e};
    }
  }

  async show ({ params,request}) {
    try {
      const imovel = await Imovel.findOrFail(params.id)
      return imovel
    } catch(e) {
      
      return{erro: e}
    }
  }

  async update ({ params, request}) {
    const data = request.only(['titulo','descricao'])

    if (imovel.user_id !== request.userId) {return {message: 'not allowed'}}

    const rules = {
      titulo: 'required|min:3|max:50',
      descricao: 'required|min:10'
    }

    const messages = {
      'titulo.required': 'titulo invalido',
      'titulo.min': 'titulo muito curto',
      'titulo.max': 'titulo muito grande',
      'descricao.required': 'descrição invalida',
      'descricao.min': 'descrição muito curta'
    }

    const validation = await validate(data, rules, messages)
    if (validation.fails()) {
      return {erro: validation.messages()}
    }

    
    try {
      const imovel = await Imovel.findOrFail(params.id)
      await imovel.merge(data)
      await imovel.save()

      return imovel
    } catch(e) {
      return {erro: 'something went wrong'};
    }
  }

  
  async destroy ({params, request}) {
    if (imovel.user_id !== request.userId ) {return {message: 'not allowed'}}
    try {
      const imovel = await Imovel.findOrFail(params.id)

      await imovel.delete()

      return {message: 'removido com sucesso'}
    } catch(e) {
      
      return {erro: 'something went wrong'}
    }
  }
}

module.exports = ImovelController
