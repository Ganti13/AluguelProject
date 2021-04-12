'use strict'

const Helpers = use('Helpers')
const Aluguel = use('App/Models/Aluguel')


class ImageController {
  

  
  async store ({ request, response, params }) {
    try {
      
    const aluguel = await Aluguel.findOrFail(params.id)
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
          .map(image => aluguel.images().create({path: image.fileName} ))

      )

    return {message: 'imagens adicionadas com sucesso'}
    } catch(e) {
      
      return {erro: 'something went wrong'}
    }


  }

}

module.exports = ImageController
