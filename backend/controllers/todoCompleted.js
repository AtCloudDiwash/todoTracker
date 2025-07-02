const {TodoModel} = require("../models/user");
async function todoCompleted(req, res){
    const userId = req.userId;
    const todoId = req.body.todoId;

    try{
        const updatedTodo = await TodoModel.findOneAndUpdate(
            { _id: todoId, userId},
            { completed: true },            
          );

          return res.status(200).json({msg: "Task Completed"});
    } catch(err){
        return res.status(500).json({error: "Error occured, Try again"});
    }

}

module.exports = {todoCompleted};