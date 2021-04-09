'use strict'


const Aluguel = use('App/Models/Aluguel')
const { validate } = use('Validator')

class AluguelController {
  
  async index ({request}) {

    try {
      const aluguel = await Aluguel.query().where('user_id', request.userId).fetch()

      return aluguel

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
      const aluguel = await Aluguel.create({...data, user_id: id})
      return aluguel  
    } catch(e) {
      
      return {erro: 'something went wrong'};
    }
  }

  async show ({ params,request}) {
    try {
      const aluguel = await Aluguel.findOrFail(params.id)
      return aluguel
    } catch(e) {
      
      return{erro: e}
    }
  }

  async update ({ params, request}) {
    const data = request.only(['titulo','descricao'])


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
      const aluguel = await Aluguel.findOrFail(params.id)
      if (aluguel.user_id !== request.userId) {return {message: 'not allowed'}}
      await aluguel.merge(data)
      await aluguel.save()

      return aluguel
    } catch(e) {
      return {erro: 'something went wrong'};
    }
  }

  
  async destroy ({params, request}) {
    try {
      const aluguel = await Aluguel.findOrFail(params.id)
      if (aluguel.user_id !== request.userId ) {return {message: 'not allowed'}}

      await aluguel.delete()

      return {message: 'removido com sucesso'}
    } catch(e) {
      
      return {erro: 'something went wrong'}
    }
  }
}

module.exports = AluguelController
