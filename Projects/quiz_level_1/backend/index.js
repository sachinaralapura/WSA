const express = require("express");
const cors = require("cors");
require("dotenv/config");
const db = require("./utils/db.js");
const questionRouter = require("./routes/questionRoute.js");
const path = require("path");


const PORT = process.env.PORT || 8000;

const app = express();



app.use(express.json());
app.use(cors());
app.use("/api/v1/question", questionRouter);


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

// Error handling Middlewares
// 404 Eror
app.use((req, res, next) => {
    const error = new Error("Page Not found");
    error.status = 404;
    next(error);
});

// General Error handling
app.use((error, req, res, next) => {
    res.locals.message = error.message
    res.locals.error = process.env.ENVIRONMENT === "DEVELOPEMENT" ? error : {};
    res.status(error.status || 500);
    res.render("error"); // Render to error.pug template
})

app.listen(PORT, () => {
    db();
    console.log(`server running on port ${PORT}`);
});
