import express from "express"
import "dotenv/config";
import moment from "moment-timezone";
import cors from "cors"
import connectDb from "./utils/db.js";
import router from "./routes/tasks.route.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get("/", (req, res) => {
    console.log(req);
    res.send("hello world")
})

app.use("/api/v2/tasks", router);

app.listen(PORT, () => {
    connectDb();
    console.log(`Listening on PORT ${PORT}...`)
})