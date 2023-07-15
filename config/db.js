const mongoose = require("mongoose")

const configureDB = async () => {
    try {
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/user-auth-feb-2023')
        console.log('connected to db')
    } catch(e) {
        console.log('error connecting to db')
    }
}

// const configureDB = () => {
//    mongoose.connect('mongodb://127.0.0.1:27017/user-auth-feb-2023')
//     .then(() => {
//         console.log('connected to db')
//     })
//     .catch((err) => {
//         console.log('error connecting to db')
//     })
// }
module.exports = configureDB