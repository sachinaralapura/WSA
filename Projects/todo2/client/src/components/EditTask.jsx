import { useCallback, useState } from "react";
import { editIcon, titlePlaceholderImg, memo, calendar } from "../assets/asset";
import InputField from "./ui/InputField";
import clsx from "clsx";
import { updateTaskApi } from "../utils/taskapi";

export default function EditTask({ task, fetchAllTask, onCancel }) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [dueDate, setDueDate] = useState(
    task.due_date ? new Date(task.due_date) : undefined
  );

  const [loading, setLoading] = useState(false);

  const handleResponse = useCallback(
    function (responseData) {
      if (responseData.success) {
        fetchAllTask();
      }
    },
    [fetchAllTask]
  );

  const handleError = (error) => {
    console.log(error);
    alert("Failed to create new Task");
  };

  const updateTask = useCallback(
    function (values) {
      updateTaskApi(values, task._id, handleResponse, handleError, setLoading);
    },
    [handleResponse, handleError]
  );

  const handleEditTask = useCallback(
    function () {
      const values = {
        taskTitle: title,
        taskDescription: description,
        taskDueDate: new Date(dueDate),
      };
      if (!validate(values)) {
        return;
      }
      updateTask(values);
    },
    [updateTask, title, description, dueDate]
  );

  const validate = function (values) {
    const { taskTitle, taskDescription } = values;
    if (taskTitle && taskDescription) {
      return true;
    }
    const errorMessage = "Please fill out all fields";
    alert(errorMessage);
    return false;
  };

  return (
    <div className="create-task-section">
      <div className="create-task-card">
        <img src={editIcon} alt="" width={263} />
        <h1 className="create-task-title-text">Edit Task</h1>

        <InputField
          name={"edit-task-title"}
          label={"Title"}
          type={"text"}
          inputImg={titlePlaceholderImg}
          placeHolder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          name="edit-task-description"
          label="description"
          type="textarea"
          inputImg={memo}
          placeHolder={"Description"}
          className={"input-margin"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <InputField
          name="edit-task-due-date"
          label={"Due Date"}
          type={"date"}
          inputImg={calendar}
          placeHolder="Due Date"
          className="input-margin"
          value={dueDate}
          onChange={(date) => setDueDate(date)}
        />
        <div className="add-edit-task-btns">
          <button
            className={clsx("btn", "edit-task-btn", "cursor-pointer")}
            onClick={handleEditTask}
          >
            Save
          </button>
          <button className="btn cancel-btn cursor-pointer" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
