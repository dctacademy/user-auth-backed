require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configureDB = require('./config/db')
const usersCltr = require('./app/controllers/usersController')
const todosCltr = require('./app/controllers/todosController')
const categoriesCltr = require('./app/controllers/categoriesController')
const productsCltr = require('./app/controllers/productsController')
const authenticateUser = require('./app/middlewares/authentication')
const authorizeUser = require('./app/middlewares/authorization')
const PORT = 3050
const app = express() 
app.use(express.json())
app.use(cors())
configureDB()


app.post('/api/users/register', usersCltr.register)
// app.post('/api/users/create', authenticateUser, (req, res, next) => {
//     req.permittedRoles = ['admin']
//     next()
// }, authorizeUser, usersCltr.create)
app.post('/api/users/login', usersCltr.login)
// routing level middleware
app.get('/api/users/account', authenticateUser, usersCltr.account)

app.get('/api/todos', authenticateUser, todosCltr.list)
app.post('/api/todos', authenticateUser, todosCltr.create)
app.get('/api/todos/:id', authenticateUser, todosCltr.show) 
app.put('/api/todos/:id', authenticateUser, todosCltr.update)
app.delete('/api/todos/:id', authenticateUser, todosCltr.destroy)


app.get('/api/categories', authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['admin', 'staff', 'user']
        next()
    }, authorizeUser, categoriesCltr.list)

app.post('/api/categories', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, categoriesCltr.create)

app.get('/api/categories/:id', authenticateUser, 
    (req, res, next) => {
        req.permittedRoles = ['admin','staff', 'user']
        next()
    }, authorizeUser, categoriesCltr.show)

app.put('/api/categories/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin', 'staff']
    next()
}, authorizeUser, categoriesCltr.update)

app.delete('/api/categories/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, categoriesCltr.destroy)


app.get('/api/products', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin', 'staff', 'user']
        next()
    }, authorizeUser, productsCltr.list)

app.post('/api/products', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin','staff']
    next()
}, authorizeUser, productsCltr.create)

app.get('/api/products/:id', authenticateUser,
    (req, res, next) => {
        req.permittedRoles = ['admin', 'staff', 'user']
        next()
    }, authorizeUser, productsCltr.show)

app.put('/api/products/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin', 'staff']
    next()
}, authorizeUser, productsCltr.update)

app.delete('/api/products/:id', authenticateUser, (req, res, next) => {
    req.permittedRoles = ['admin']
    next()
}, authorizeUser, productsCltr.destroy)


app.listen(PORT, () => {
    console.log('server running on port', PORT)
})