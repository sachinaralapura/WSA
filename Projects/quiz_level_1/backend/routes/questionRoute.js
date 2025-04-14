const express = require("express");
const { checkAnswer, getQuestion } = require("../controllers/questionController.js");

const quesionRouter = express.Router(); 

// GET [api/v1/]
quesionRouter.get("/", getQuestion)

quesionRouter.post("/", checkAnswer)

module.exports = quesionRouter