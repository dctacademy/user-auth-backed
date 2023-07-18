const Todo = require('../models/todoModel') 
const todosCltr = {}

todosCltr.list = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user._id })
        res.json(todos)
    } catch(e) {   
        res.json(e) 
    }
}

todosCltr.create = async (req, res) => {
    try {
        const body = req.body 
        const todo = new Todo(body) 
        todo.user = req.user._id 
        const todoDoc = await todo.save()
        res.json(todoDoc)
    } catch (e) {
        res.json(e) 
    }
}

todosCltr.show = async (req, res) => {
    try {
        const id = req.params.id 
        const todo = await Todo.findOne({ _id: id, user: req.user._id })
        res.json(todo) 
    } catch(e) {
        res.json(e)
    }
}

todosCltr.update = async (req, res) => {
    try {
        const id = req.params.id 
        const body = req.body 
        const todo = await Todo.findOneAndUpdate({ _id: id, user: req.user._id }, body, { new: true, runValidators: true })
        res.json(todo) 
    } catch(e) {
        res.json(e) 
    }
}

todosCltr.destroy = async (req, res) => {
    try { 
        const id = req.params.id 
        const todo = await Todo.findOneAndDelete({ _id: id, user: req.user._id })
        res.json(todo) 
    } catch(e) {
        res.json(e) 
    }
}

module.exports = todosCltr 

/*
u1 - 123 todo - 1 - { _id: 1, title: '', user: 123 }

u2 - 222
*/