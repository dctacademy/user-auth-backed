const jwt = require('jsonwebtoken')
const tokenData = {
    id: 123
}

const token = jwt.sign(tokenData, 'dctdct111') 
console.log(token)