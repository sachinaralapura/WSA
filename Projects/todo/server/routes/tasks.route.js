import { Router } from "express";
import { createNewTask, sendAllTask, updateTask  ,deleteTask} from "../controllers/task.controller.js"
const router = Router();

router.get("/tasks", sendAllTask)

router.post("/task", createNewTask);

router.put("/task/:id", updateTask);

router.delete("/task/:id", deleteTask);

export default router;