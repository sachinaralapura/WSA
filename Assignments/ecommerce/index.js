import express from "express"
import "dotenv/config";
import cors from "cors"
import connectDb from "./utils/db.js";
import router from "./Routes/store_routes.js"
const app = express();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/api", router);

app.listen(PORT, () => {
    connectDb();
    console.log(`Listening on PORT ${PORT}...`)
})