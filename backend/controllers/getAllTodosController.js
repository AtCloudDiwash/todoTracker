const {TodoModel} = require("../models/user");

async function getAllTodos(req, res) {

    const isCompleted = req.params.completed;

    try{

        const userId = req.userId;

        if (!userId) {
          return res
            .status(401)
            .json({ error: "Access denied, Try logging out and signing again" });
        }

        const foundTodos = await TodoModel.find({$and:[{userId},{completed: isCompleted}]})

        return res.status(200).json({msg: "your todos", todos: foundTodos});

    } catch(err){
        return res.status(500).json({err: "Something went wrong. Try again."})

    }
    
}

module.exports = {getAllTodos};