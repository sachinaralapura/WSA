import TaskModel from "../models/task.model.js";

export const sendAllTask = async (req, res) => {
  try {
    const tasks = await TaskModel.find({}, null, {});
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (err) {
    console.log(err);
  }
};

export const createNewTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    if (!title || !description) {
      res.status(400).json({ message: "Title or description is empty" });
    }
    const newTask = await TaskModel.create({ title, description, due_date });
    if (!newTask) {
      throw new Error("error creating a new Task");
    }   
    if (!newTask)
      res.status(200).json({
        success: true,
        message: "new Task created",
        task: newTask,
      });
  } catch (err) {
    res.status(400).json({
      message: "error creating a new task",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, due_date } = req.body;

    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    if (!title || !description) {
      res.status(400).json({ message: "Error" });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { title, description, due_date },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      updateTask,
      message: "task updated successfully",
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    if (!taskId) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    console.log(deleteTask);

    res.status(200).json({
      success: true,
      deleteTask,
      message: "task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
