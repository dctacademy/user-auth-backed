const mongoose = require('mongoose')
const Schema = mongoose.Schema 

const todoSchema = new Schema({
    title: {
        type: String,
        reqired: true 
    }, 
    dueDate: {
        type: Date,
        default: new Date() 
    },
    isCompleted: {
        type: Boolean,
        default: false 
    }, 
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
}, { timestamps: true })

const Todo = mongoose.model('Todo', todoSchema) 

module.exports = Todo 