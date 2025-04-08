import QuestionModel from "../model/questionModel.js"
const MAX_QUESTION_COUNT = 30;
/**
 * @param {import('express').Request} req - The Express request object
 * @param {import('express').Response} res - The Express response object
 * @returns {Promise<void>}
 */
export async function getQuestion(req, res) {
    try {

        const questions = await QuestionModel.aggregate([
            {
                $sample: { size: MAX_QUESTION_COUNT }
            },
            {
                $project: { question: 1, options: 1 } // or { answer : 0 }}
            }
        ]);
        res.status(200).json({ success: true, questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message })
    }
}
