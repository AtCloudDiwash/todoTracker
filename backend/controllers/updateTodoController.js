const {TodoModel} = require("../models/user");

async function updateTodo(req, res){

    const userId = req.userId;
    const {selectedTodoId, title, deadline} = req.body;
    const parsedTitle = String(title);
    
    if(!parsedTitle){
        return res.status(400).json({msg: "No change"})
    }

    try{

        const updateTodo = await TodoModel.findOneAndUpdate({_id: selectedTodoId, userId},
            {
                title: parsedTitle,
                deadline: deadline ?? null,
                completed: false
            },
            {new: true} //this will return updated doc
        );

        if(!updateTodo){
            return res.status(404).json({msg: "Todo not found, cannot update."})
        }

        return res.status(200).json({msg: "Todo updated", todo: updateTodo})

    } catch(err){
        return res.status(500).json({msg: "Something Went wrong, Try again"});
    }

}

module.exports = {updateTodo};