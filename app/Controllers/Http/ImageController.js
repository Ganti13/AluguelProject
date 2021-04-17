'use strict'

const Helpers = use('Helpers')
const Imovel = use('App/Models/Imovel')
const Image = use('App/Models/Image')


class ImageController {
  

  
  async store ({ request, response, params }) {
    try {
      
    const imovel = await Imovel.findOrFail(params.id)
    const images = request.file('image', {
      types: ['image'],
      size: '2mb'
    })

    await images.moveAll(Helpers.tmpPath('uploads/images'), file =>{
      return{
        name: `${Date.now()}-${file.clientName}`
      }
    })

    if (!images.movedAll()) {return images.error()}

    await Promise.all(
      images
        .movedList()
          .map(image => imovel.images().create({path: image.fileName} ))

      )

    return {message: 'imagens adicionadas com sucesso'}
    } catch(e) {
      
      return {erro: 'something went wrong'}
    }


  }

  async destroy({params, request, response}){

    try {
      const imovel = await Imovel.findOrFail(params.id)
      const image = await Image.findOrFail(params.path)

      if (request.userId = imovel.user_id) {return 'not allowed'}

      await image.delete()
      return {message: 'imagem deletada com sucesso'}

    } catch(e) {
      return {message: 'something went wrong', erro: e}
    }

  }

  async show({params, response}){
    
    return response.download(Helpers.tmpPath(`/uploads/images/${params.path}`))

  }

}

module.exports = ImageController
