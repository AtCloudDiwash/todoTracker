require("dotenv").config();
const { TodoModel } = require("../models/user");
const getRemainingTime = require("../utils/getRemainingTime");

async function addTodo(req, res){

    const {title, deadline} = req.body;
    const parsedTitle = String(title);

    if(!parsedTitle){
        return res.status(400).json({error: "Title is required"});
    }

    try{

        const userId = req.userId;

        if(!userId){
            return res.status(401).json({error: "Access denied, Try logging out and signing again"})
        }

        const newTodo = await TodoModel.create({
            userId,
            title: parsedTitle,
            deadline: deadline ?? null
        });

        const endsIn = getRemainingTime(newTodo.deadline);

        return res.status(200).json({msg: "Todo created", newTodo:{title: newTodo.title, deadline: newTodo.deadline.toLocaleString(), endsIn}});

    } catch(err){

        return res
          .status(500)
          .json({ errror: "Something went wrong. Please try again." });

    }

}

module.exports = {addTodo};

