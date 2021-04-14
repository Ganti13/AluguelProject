'use strict'


const Route = use('Route')

Route.post('/user', 'UserController.store')
Route.delete('/user/:id', 'UserController.destroy').middleware('authUser')
Route.put('/user/:id', 'UserController.update').middleware('authUser')
Route.post('/login', 'LoginController.login')

Route.post('/aluguel/:id/images', 'ImageController.store').middleware('authUser')
Route.delete('/aluguel/:id/images/:path', 'ImageController.destroy').middleware('authUser')
Route.get('/images/:path', 'ImageController.show')

Route.resource('/admin', 'AdminController').middleware('authAdmin').apiOnly()
Route.post('/loginAdmin', 'LoginController.loginAdmin')

Route.resource('aluguel', 'AluguelController').apiOnly().middleware('authUser')
