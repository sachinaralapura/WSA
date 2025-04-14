const QuestionModel = require("../model/questionModel");
const MAX_QUESTION_COUNT = 30;
/**
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */
async function getQuestion(req, res) {
    try {

        const questions = await QuestionModel.aggregate([
            {
                $sample: { size: MAX_QUESTION_COUNT }
            },
            {
                $project: { question: 1, options: 1 } // or { answer : 0 }}
            }
        ]);
        res.status(200).json({ success: true, data: questions.length, questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}


/**
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */
async function checkAnswer(req, res) {
    try {
        const { id, answer } = req.body;
        if (!id || !answer || !answer.id || !answer.value)
            return res.status(400).json({ success: false, message: "Invalid Request" });

        const question = await QuestionModel.findById(id);
        if (!question)
            return res.status(400).json({ success: false, message: "Question not found" });

        if (question.answer.id === answer.id && question.answer.value === answer.value)
            return res.status(200).json({ success: true, message: "Correct answer 👍", status: true });

        return res.status(200).json({ success: true, message: "Wrong answer 😔", status: false })

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message })
    }
}

module.exports = { getQuestion, checkAnswer };