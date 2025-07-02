const {UserModel} = require("../models/user");

async function getUserDetails(req, res){
    const userId = req.userId;

    if(!userId){
        return res.status(404).json({error: "User not found, Please re-login"});
    } else{
        try{

            const foundUser = await UserModel.findOne({_id: userId});

            return res.status(200).json({username: foundUser.username});    

        } catch (err){
            return res.status(500).json({error: "Log out and try again"});
        }
    }
}

module.exports = {getUserDetails}
