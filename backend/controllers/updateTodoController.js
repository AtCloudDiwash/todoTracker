const {TodoModel} = require("../models/user");

async function updateTodo(req, res){

    const userId = req.userId;
    const {selectedTodoId, title, deadline} = req.body;
    const parsedTitle = String(title);
    
    if(!parsedTitle){
        return res.status(400).json({error: "No change"})
    }

    try{

        const updateTodo = await TodoModel.findOneAndUpdate({_id: selectedTodoId, userId},
            {
                title: parsedTitle,
                deadline: deadline ?? null,
            },
            {new: true}
        );

        if(!updateTodo){
            return res.status(404).json({error: "Todo not found, cannot update."})
        }

        return res.status(200).json({msg: "Todo updated", todo: updateTodo})

    } catch(err){
        return res.status(500).json({error: "Something Went wrong, Try again"});
    }

}

module.exports = {updateTodo};