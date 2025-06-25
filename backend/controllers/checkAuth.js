require("dotenv").config();

const jwt = require("jsonwebtoken");

async function checkAuth(req, res){
    const token = req.headers.authorization;

    try{
        const decidedUser = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({msg: "Valid token, redirecting user..."})

    } catch(err) {

        return res.status(401).json({msg: "Invalid token"})

    }

}

module.exports = {checkAuth}