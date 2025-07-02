const {TodoModel} = require("../models/user");
async function getLatestUpdate(req, res){

    const userId = req.userId;

    try{
        const now = new Date();
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(now.getDate() - 3);

        const recentCompletedTodos = await TodoModel.find({
          userId,
          completed: true,
          updatedAt: {
            $gte: threeDaysAgo,
            $lte: now,
          },
        }).sort({ updatedAt: -1 }).limit(5);

        return res.status(200).json({ recentActivities: recentCompletedTodos });
        
    } catch(err){
        return res.status(500).json({error: "Something went wrong, can't get recent histories"})
    }

}

module.exports = {getLatestUpdate}