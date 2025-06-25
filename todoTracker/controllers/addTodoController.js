require("dotenv").config();
const { TodoModel } = require("../models/user");

async function addTodo(req, res){

    const {title, deadline} = req.body;
    const parsedTitle = String(title);

    if(!parsedTitle){
        return res.status(400).json({msg: "Title is required"});
    }

    try{

        const userId = req.userId;

        if(!userId){
            return res.status(401).json({msg: "Access denied, Try logging out and signing again"})
        }

        const newTodo = await TodoModel.create({
            userId,
            title: parsedTitle,
            deadline: deadline ?? null
        });

        console.log(newTodo.title);

        return res.status(200).json({msg: "Todo created", newTodo:{title: newTodo.title}});

    } catch(err){

        return res
          .status(500)
          .json({ msg: "Something went wrong. Please try again." });

    }

}

module.exports = {addTodo};

