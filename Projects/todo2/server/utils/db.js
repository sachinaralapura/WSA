import mongoose from "mongoose"
import "dotenv/config"

const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log("MongoDb connected");
    }).catch(() => console.log("Error connecting MongoDb")
    )
}

export default connectDb;