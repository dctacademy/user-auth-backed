const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    name: {
        type: String,
        reqired: true
    },
    price: {
        type: Number,
        reqired: true,
        min: 1
    },
    description: {
        type: String
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categroy',
        required: true 
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

module.exports = Product 