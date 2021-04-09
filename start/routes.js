'use strict'


const Route = use('Route')

Route.post('/user', 'UserController.store')
Route.delete('/user/:id', 'UserController.destroy').middleware('authUser')
Route.put('/user/:id', 'UserController.update').middleware('authUser')
Route.post('/login', 'LoginController.login')

Route.resource('/admin', 'AdminController').middleware('authAdmin').apiOnly()
Route.post('/loginAdmin', 'LoginController.loginAdmin')

Route.resource('aluguel', 'AluguelController').apiOnly().middleware('authUser')
