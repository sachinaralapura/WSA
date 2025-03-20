import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    due_date: Date
})

const TaskModel = mongoose.model("tasks", taskSchema);
export default TaskModel