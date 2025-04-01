import { Router } from "express";
import { createNewTask, updateTask, deleteTask, getAllTasks, updateLabels, getLabels, updateStatus } from "../controllers/task.controller.js"
const router = Router();

// GET [api/v2/tasks]
router.get("/", getAllTasks)

// GET [api/v2/tasks/labes]
router.get("/labels", getLabels)

// POST [api/v2/tasks]
router.post("/", createNewTask);

// PUT [api/v2/tasks/id]
router.put("/:id", updateTask);

// PUT [api/v2/tasks/id/labels]
router.put("/:id/labels", updateLabels);

// PUT [api/v2/tasks/id/status]
router.put("/:id/status", updateStatus)

// DELETE [api/v2/tasks/id]
router.delete("/:id", deleteTask);

export default router;