const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const pick  = require('lodash/pick')
const usersCltr = {}

// usersCltr.register = (req, res) => {
//    const body = req.body 
//    const user = new User(body)
//    bcrypt.genSalt()
//     .then((salt) => {
//         bcrypt.hash(user.password, salt)
//             .then((hashedPassword) => {
//                 user.password = hashedPassword 
//                 user.save()
//                     .then((userDoc) => {
//                         res.json(userDoc)
//                     })
//                     .catch((err) => {
//                         res.json(err)
//                     })
//             })
//             .catch((er) => {
//                 res.json(err)
//             })
//     })     
//     .catch((err) =>{
//         res.json(err)
//     })
// }

usersCltr.register = async (req, res) => {
    try {
        // sanitize req.body
        const body = pick(req.body, ['username', 'email', 'password'])
        // const { username, email, password } = req.body 
        // const body = { username, email, password }
       
        const user = new User(body) 
        const salt = await bcrypt.genSalt() 
        const hashedPassword = await bcrypt.hash(user.password, salt) 
        user.password = hashedPassword
        const userDoc = await user.save()
        res.json(userDoc)  
    } catch(e) {
        res.json(e)
    }
}

usersCltr.login = (req, res) => {

}

usersCltr.logout = (req, res) => {

}

usersCltr.account = (req, res) => {

}

module.exports = usersCltr 

