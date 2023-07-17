const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const pick  = require('lodash/pick')
const jwt = require('jsonwebtoken')
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

// usersCltr.login = (req, res) => {
//     const body = pick(req.body, ['email', 'password'])
//     User.findOne({ email: body.email})  
//         .then((user) => {
//             if(user) {
//                 bcrypt.compare(body.password, user.password) 
//                     .then((result) => {
//                         if(result) {
//                             res.json(user) 
//                         } else {
//                             res.status(404).json({ errors: 'invalid email / password'})
//                         }
//                     })
//             } else {
//                 res.status(404).json({ errors: 'invalid email / password '})
//             }
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }
usersCltr.login = async (req, res) => {
    try {
        const body = pick(req.body, ['email', 'password'])
        const user = await User.findOne({ email: body.email }) 
        if(user) {
            const result = await bcrypt.compare(body.password, user.password)
            if(result) { // if password is valid 
                // generate token and send the token 
                const tokenData = {
                    id: user._id
                }
                const token = jwt.sign(tokenData, process.env.JWT_SECRET)
                res.json({
                    token: `Bearer ${token}`
                }) 
            } else { // if user email present but password is wrong 
                // res.status(404).json({ errors: 'invalid email / passwordd'})
            }
        } else { // if user acount not found
            res.status(404).json({ errors: 'invalid email / password'})
        }
    } catch(e) {
        res.json(e) 
    }   
}

usersCltr.account = (req, res) => {

}

module.exports = usersCltr 
