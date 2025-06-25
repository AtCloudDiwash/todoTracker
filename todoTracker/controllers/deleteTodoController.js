const {TodoModel} = require("../models/user");
const {Types} = require("mongoose");

async function deleteTodo(req, res) {

    const userId = req.userId;
    const selectedTodoId = req.body.selectedTodoId;

    if(!userId){
        return res.status(401).json({msg: "Unauthorized"});
    }

    if(!selectedTodoId) {
        return res.status(400).json({msg: "Try again"});
    }

    try{
        
        const todoFound = await TodoModel.findOneAndDelete({
          _id: selectedTodoId,
          userId,
        });


        if(!todoFound){
            return res.status(404).json({msg: "Todo not found"});
        }

        return res.status(200).json({msg: "Todo deleted"})

    } catch(err){
        res.status(500).json({msg: "Something went wrong. Try again"});
    }
    
}

module.exports = {deleteTodo};