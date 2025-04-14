require("dotenv/config");
const mongoose = require("mongoose")

const db = () => {
    mongoose.connect(process.env.DATABASE_URI).then(() => {
        console.log("MongoDb Connected");
    }).catch((err) => {
        console.log("Error Connecting to database");
    })
}
module.exports = db;
