const bcrypt = require('bcryptjs')
const encryptedPassword = '$2a$10$Iaj1XEcxeDD5oXLRjdMMg.nwX6qHAZtnlWXaDLKCrYXEEMTrTx0l6'
const userInput = 'secret007'

bcrypt.compare(userInput, encryptedPassword) 
    .then((result) => {
        console.log(result)
    })