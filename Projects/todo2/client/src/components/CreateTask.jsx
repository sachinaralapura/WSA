import React, { useCallback, useState } from "react";
import { userIcon, titlePlaceholderImg, memo, calendar } from "../assets/asset";
import InputField from "./ui/InputField";
import clsx from "clsx";
import { createTaskApi } from "../utils/taskapi";

export default function CreateTask({ onCreateTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState();

  const [loading, setLoading] = useState(false);

  const handleResponse = useCallback(
    function (responseData) {
      if (responseData.success) {
        onCreateTask();
      }
    },
    [onCreateTask]
  );

  const handleError = (error) => {
    console.log(error);
    alert("Failed to create new Task");
  };

  const createNewTask = useCallback(
    function (values) {
      createTaskApi(values, handleResponse, handleError, setLoading);
    },
    [handleResponse]
  );

  const handleCreateTask = useCallback(
    function () {
      const values = {
        taskTitle: title,
        taskDescription: description,
        taskDueDate: new Date(dueDate),
      };
      if (!validate(values)) {
        return;
      }
      createNewTask(values);
    },
    [createNewTask, title, description, dueDate]
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
    <div className="content-section create-task-section">
      <div className="create-task-card">
        <img src={userIcon} alt="" width={263} />
        <h1 className="create-task-title-text">Create New Task</h1>
        <InputField
          name={"new-task-title"}
          label={"Title"}
          type={"text"}
          inputImg={titlePlaceholderImg}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeHolder={"Title"}
        />
        <InputField
          name="new-task-description"
          label="description"
          type="textarea"
          inputImg={memo}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeHolder={"Description"}
          className={"input-margin"}
        />

        <InputField
          name="new-task-due-date"
          label={"Due Date"}
          type={"date"}
          inputImg={calendar}
          value={dueDate}
          onChange={(date) => setDueDate(date)}
          placeHolder="Due Date"
          className="input-margin"
        />

        <div className="add-edit-task-btns">
          <button
            className={clsx("btn", "add-task-btn", "cursor-pointer")}
            disabled={loading}
            onClick={handleCreateTask}
          >
            Add Task
          </button>
          <button className="btn cancel-btn cursor-pointer" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
