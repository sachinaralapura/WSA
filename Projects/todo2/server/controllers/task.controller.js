
import moment from "moment-timezone";
import TaskModel from "../models/task.model.js";

export const getAllTasks = async (req, res) => {
    try {
        const { sort_by, sort_type, status, page, labels, limit = 10 } = req.query;
        let query = {}
        let options = {};
        if (status && status.length > 0) {
            const statusItems = JSON.parse(status)
            query.status = { $in: statusItems }
        }
        if (labels && labels.length > 0) {
            const labelsItems = JSON.parse(labels)
            query.labels = { $in: labelsItems }
        }
        if (sort_by && ["added_on", "due_date"].includes(sort_by)) {
            const sortOptions = {}
            sortOptions[sort_by] = sort_type === "desc" ? -1 : 1;
            options.sort = sortOptions
        }
        if (page) {
            options.limit = parseInt(limit)
            options.skip = (parseInt(page) - 1) * parseInt(limit)
        }
        const tasks = await TaskModel.find(query, null, options)
        res.status(200).json({
            success: true,
            message: "success",
            results: tasks.length,
            data: tasks,
        });
    } catch (err) {
        console.log(err);
    }
};

export const getLabels = async (req, res) => {
    try {
        const labels = await TaskModel.distinct("labels")
        if (!labels.length) {
            return res.status(400).json({ success: false, message: "No labels found" })
        }
        return res.status(200).json({ success: true, message: "successful", labels })
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const createNewTask = async (req, res) => {
    try {
        const { title, description, due_date } = req.body;
        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Title or description is empty" });
        }
        let istDueDate
        if (due_date) {
            istDueDate = moment.tz(due_date, "Asia/Kolkata").toDate();
        }
        const newTask = await TaskModel.create({ title, description, istDueDate });
        if (!newTask) {
            throw new Error("error creating a new Task");
        }
        res.status(200).json({
            success: true,
            message: "New Task created",
            task: newTask,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            message: `error : ${err}`,
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

export const updateLabels = async (req, res) => {
    try {
        const { id } = req.params;
        const {labels} = req.body;
        if (!id || !labels || !Array.isArray(labels))
            return res.status(400).json({ message: "Invalid input data", success: false })

        const task = await TaskModel.findById(id)
        if (!task)
            return res.status(400).json({ message: "Task not found" })
        task.labels = labels
        const updatedTask = await task.save()
        res.status(200).json({
            success: true,
            message: "task labels updated successfully",
            updatedTask,
        });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
}




export const updateStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        if (!id || !status) {
            return res.status(400).json({ success: false, message: "Invalid input data" })
        }

        if (status && !["Open", "In-Progress", "Completed"].includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status data" })
        }

        const task = await TaskModel.findById(id)
        if (!task) {
            return res.status(400).json({ success: false, message: "task not found" })
        }
        task.status = status
        const updatedTask = await task.save()

        return res.status(200).json({ success: true, message: "Status updated", updatedTask })

    } catch (err) {
        console.error(err.message)
        return res.status(400).json({ success: false, message: "error updating status" })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        if (!taskId) {
            return res.status(400).json({ message: "Task ID is required" });
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }
        res.status(200).json({
            success: true,
            deleteTask,
            message: "task deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
