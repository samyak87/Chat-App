import mongoose from "mongoose";
import dotenv, { configDotenv } from "dotenv";

configDotenv();
const connectToMongodb = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to mongodb");
        
    } catch (error) {
        console.log("Error connecting to mongodb ",error.message);

        
    }
}

export default connectToMongodb;