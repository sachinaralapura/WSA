import React, { useCallback, useState } from "react";
import {
  alarmClock,
  blueChecked,
  deleteIcon,
  editIcon,
  redTag,
} from "../assets/asset";
import moment from "moment";
import DeleteTask from "./ui/DeleteTask";
import StatusDropDown from "./ui/StatusDropDown";
export default function TaskTile({
  task,
  onClick,
  fetchAllTask,
  changeTaskStatus,
  setActiveTaskId,
  showEditTaskScreen,
  boardView,
}) {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

  const closeDeleteTaskPopup = function () {
    setShowDeleteTaskPopup(false);
  };

  const handleEditTask = useCallback(
    function (e) {
      //In this case, parent element that is task-tile-container have an onCkick propert and also child
      //element(edit-container) onClick Property. Because of the event bubbling, when we click on the edit
      //button, it open the viewTaskScreen. Which can be stopped using e.stopPropagation
      e.stopPropagation();
      setActiveTaskId(task._id);
      showEditTaskScreen();
    },
    [setActiveTaskId, showEditTaskScreen, task._id]
  );

  const handleDeleteTask = useCallback(function (e) {
    e.stopPropagation();
    setShowDeleteTaskPopup(true);
  });

  return (
    <>
      <div className="task-tile-container cursor-pointer" onClick={onClick}>
        <div>
          <div className="flex">
            <span className="task-icon-wrapper">
              <img src={blueChecked} className="task-icon" alt="task icon" />
            </span>
            <div className="task-text-wrapper">
              <p className="tast-primary-text">{task?.title}</p>
              <p className="task-secondary-text">{task?.description}</p>
            </div>
          </div>
          {!boardView && task.labels.length ? (
            <span className="labels-icon-wrapper">
              <img src={redTag} alt="label icon" />
              <span className="labels-rows">
                {task.labels.map((label) => (
                  <span key={`${task._id}-${label}`}>{label}</span>
                ))}
              </span>
            </span>
          ) : null}
        </div>
        <div className="status-action-item">
          <div className="action-items-container">
            {/* status dropdown */}
            <StatusDropDown
              value={task.status}
              taskId={task._id}
              changeTaskStatus={changeTaskStatus}
            />

            {task?.due_date && (
              <div className="flex date-container">
                <img src={alarmClock} alt="alarm clock" />
                <p className="date-text">
                  {moment(task?.due_date).format("DD MMM YYYY")}
                </p>
              </div>
            )}

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
        {boardView && task.labels.length ? (
          <span className="labels-icon-wrapper">
            <img src={redTag} alt="label icon" />
            <span className="labels-rows">
              {task.labels.map((label) => (
                <span key={`${task._id}-${label}`}>{label} </span>
              ))}
            </span>
          </span>
        ) : null}
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
