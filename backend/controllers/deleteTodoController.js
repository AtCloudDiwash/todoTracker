const {TodoModel} = require("../models/user");
const {Types} = require("mongoose");

async function deleteTodo(req, res) {

    const userId = req.userId;
    const selectedTodoId = req.body.selectedTodoId;

    if(!userId){
        return res.status(401).json({error: "Unauthorized"});
    }

    if(!selectedTodoId) {
        return res.status(400).json({error: "Try again"});
    }

    try{
        
        const todoFound = await TodoModel.findOneAndDelete({
          _id: selectedTodoId,
          userId,
        });


        if(!todoFound){
            return res.status(404).json({error: "Todo not found"});
        }

        return res.status(200).json({msg: "Todo deleted"})

    } catch(err){
        res.status(500).json({error: "Something went wrong. Try again"});
    }
    
}

module.exports = {deleteTodo};