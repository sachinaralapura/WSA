import express from "express";
import cors from "cors"
import "dotenv/config"
import db from "./utils/db.js"
import questionRouter from "./routes/questionRoute.js"

const PORT = process.env.PORT || 8000

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/question", questionRouter)

app.listen(PORT, () => {
    db();
    console.log(`server running on port ${PORT}`);
})
