import React, { useCallback, useState } from "react";
import { alarmClock, blueChecked, deleteIcon, editIcon } from "../assets/asset";
import moment from "moment";
import DeleteTask from "./ui/DeleteTask";
export default function TaskTile({
  task,
  fetchAllTask,
  setActiveTaskId,
  showEditTaskScreen,
  boardView,
  onClick,
}) {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

  const closeDeleteTaskPopup = function () {
    setShowDeleteTaskPopup(false);
  };

  const handleEditTask = useCallback(function (e) {
    //In this case, parent element that is task-tile-container have an onCkick propert and also child
    //element(edit-container) onClick Property. Because of the event bubbling, when we click on the edit
    //button, it open the viewTaskScreen. Which can be stopped using e.stopPropagation
    e.stopPropagation();
    setActiveTaskId(task);
    showEditTaskScreen();
  });

  const handleDeleteTask = useCallback(function (e) {
    e.stopPropagation();
    setShowDeleteTaskPopup(true);
  });

  return (
    <>
      <div className="task-tile-container cursor-pointer" onClick={onClick}>
        <span className="task-icon-wrapper">
          <img src={blueChecked} className="task-icon" alt="task icon" />
        </span>
        <div className="task-text-wrapper">
          <p className="tast-primary-text">{task?.title}</p>
          <p className="task-secondary-text">{task?.description}</p>
        </div>
        <div className="action-items-container">
          <div className="flex date-container">
            <img src={alarmClock} alt="Clock Icon" />
            <p className="date-text">
              {moment(task?.due_date).format("DD MMM YYYY")}
            </p>
          </div>

          <div
            className="edit-container cursor-pointer"
            onClick={handleEditTask}
          >
            <img src={editIcon} alt="Edit task Icon" />
          </div>

          <div
            className="delete-container cursor-pointer"
            onClick={handleDeleteTask}
          >
            <img src={deleteIcon} alt="Edit task Icon" />
          </div>
        </div>
      </div>
      <DeleteTask
        task={task}
        isOpen={showDeleteTaskPopup}
        onClose={closeDeleteTaskPopup}
        fetchAllTask={fetchAllTask}
      />
    </>
  );
}
