require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configureDB = require('./config/db')
const usersCltr = require('./app/controllers/usersController')
const todosCltr = require('./app/controllers/todosController')
const authenticateUser = require('./app/middlewares/authentication')
const PORT = 3050
const app = express() 
app.use(express.json())
app.use(cors())
configureDB()


app.post('/api/users/register', usersCltr.register)
app.post('/api/users/login', usersCltr.login)
// routing level middleware
app.get('/api/users/account', authenticateUser, usersCltr.account)

app.get('/api/todos', authenticateUser, todosCltr.list)
app.post('/api/todos', authenticateUser, todosCltr.create)
app.get('/api/todos/:id', authenticateUser, todosCltr.show) 
app.put('/api/todos/:id', authenticateUser, todosCltr.update)
app.delete('/api/todos/:id', authenticateUser, todosCltr.destroy)

app.listen(PORT, () => {
    console.log('server running on port', PORT)
})