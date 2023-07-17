require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configureDB = require('./config/db')
const usersCltr = require('./app/controllers/usersController')
const PORT = 3050
const app = express() 
app.use(express.json())
app.use(cors())
configureDB()

app.post('/api/users/register', usersCltr.register)
app.post('/api/users/login', usersCltr.login)
app.get('/api/users/account', usersCltr.account)


app.listen(PORT, () => {
    console.log('server running on port', PORT)
})