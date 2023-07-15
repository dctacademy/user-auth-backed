const bcrypt = require('bcryptjs')
const userPassword = 'secret123'
bcrypt.genSalt()
    .then((salt) => {
        console.log(salt, salt.length)
        bcrypt.hash(userPassword, salt)
            .then((hashedPassword) => {
                console.log(hashedPassword, hashedPassword.length)
            })
    })