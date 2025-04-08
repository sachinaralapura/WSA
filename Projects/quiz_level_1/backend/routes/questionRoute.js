import { Router } from "express";
import { getQuestion } from "../controllers/questionController.js";
const quesionRouter = Router();

// GET [api/v1/]
quesionRouter.get("/", getQuestion)

export default quesionRouter