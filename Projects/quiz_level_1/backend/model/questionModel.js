const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    question: String,
    options: [
        {
            id: Number,
            value: String
        }
    ],
    answer: {
        id: Number,
        value: String
    }
});

const QuestionModel = mongoose.model("question", questionSchema)
module.exports = QuestionModel;