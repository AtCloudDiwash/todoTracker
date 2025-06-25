const mongoose = require("mongoose");

const MONGO_DB_URL = process.env.MONGODB_DB_URL;

async function connectDB(){
    try{
        await mongoose.connect(MONGO_DB_URL);
        console.log("MongoDB connected ✅");  

    } catch(err){
        console.log("Connection to MongoDB failed ❌");
        process.exit(1);
    }
}

module.exports = {connectDB};