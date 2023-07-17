const bcrypt = require('bcryptjs') 

// register
// password - secret007
// during registration
const rPassword = 'z'
bcrypt.genSalt() 
    .then((salt) => {
        bcrypt.hash(rPassword, salt)
            .then((hashedPassword) => {
                console.log('password generation', rPassword, hashedPassword)

                setTimeout(() => {
                    const lPassword = 'secret700'
                    console.log('login time', lPassword)
                    bcrypt.compare(lPassword, hashedPassword) 
                        .then((result) => {
                            console.log(result)
                        })
                }, 3000)
            })
    })