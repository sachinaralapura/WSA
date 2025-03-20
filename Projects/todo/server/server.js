import express from "express"
import "dotenv/config";
import cors from "cors"
import connectDb from "./utils/db.js";
import router from "./routes/tasks.route.js";
const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/" , (req , res) =>{
    console.log(req);
    res.send("hello world")
})

app.use("/api/v1" , router);

app.listen(PORT, () => {
    connectDb(); 
    console.log(`Listening on PORT ${PORT}...`)
}) 