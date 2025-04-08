import "dotenv/config"
import mongoose from "mongoose"

const db = () => {
    mongoose.connect(process.env.DATABASE_URI).then(() => {
        console.log("MongoDb Connected");
    }).catch((err) => {
        console.log("Error Connecting to database");
    })
}
export default db;
