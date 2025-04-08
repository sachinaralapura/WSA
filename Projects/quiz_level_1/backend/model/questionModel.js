import mongoose from "mongoose";

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
export default QuestionModel;