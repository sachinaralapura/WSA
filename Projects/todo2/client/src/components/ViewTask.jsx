import { useEffect, useState, useCallback } from "react";
import Modal from "./ui/Modal";
import {
  blueChecked,
  alarmClock,
  crossIcon,
  editIcon,
  deleteIcon,
} from "../assets/asset";
import moment from "moment";
import DeleteTask from "./ui/DeleteTask";
export default function ViewTask({
  activeTask,
  setActiveTask,
  fetchAllTask,
  showEditTaskScreen,
  onCancel,
}) {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);

  const closeDeleteTaskPopup = function () {
    setShowDeleteTaskPopup(false);
  };

  const handleDeleteTask = useCallback(function (e) {
    e.stopPropagation();
    setShowDeleteTaskPopup(true);
  });

  const handleEditTask = useCallback(function (e) {
    e.stopPropagation();
    setActiveTask(activeTask);
    showEditTaskScreen();
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div>
      <Modal isOpen={true}>
        <div className="flex justify-between view-task-header">
          <div className="flex">
            <span className="task-icon-wrapper">
              <img src={blueChecked} alt="task-icon" className="task-icon" />
            </span>
            <h2 className="view-task-title"> {activeTask?.title} </h2>
          </div>
          <div className="close-modal-btn" onClick={onCancel}>
            <img src={crossIcon} alt="close popup btn" />
          </div>
        </div>

        <div className="flex">
          <pre className="view-task-description">{activeTask?.description}</pre>
          <div className="view-task-right-section">
            <div className="view-task-info-box">
              <p className="label-14">Due Date</p>
              <div className="flex date-container">
                <img src={alarmClock} alt="clock Icon" />
                <p className="date-text">
                  {moment(activeTask?.due_date).format("DD MMM YYYY")}
                </p>
              </div>
            </div>

            <div
              className="view-task-info-box flex cursor-pointer"
              onClick={handleEditTask}
            >
              <img
                src={editIcon}
                alt="Edit task IconI"
                width={16}
                height={16}
              />
              <p className="label-12">Edit task</p>
            </div>

            <div
              className="view-task-info-box flex cursor-pointer"
              onClick={handleDeleteTask}
            >
              <img
                src={deleteIcon}
                alt="Delete task icon"
                width={16}
                height={16}
              />
              <p className="label-12">Delete task</p>
            </div>
          </div>
        </div>
      </Modal>
      {showDeleteTaskPopup && (
        <DeleteTask
          task={activeTask}
          isOpen={showDeleteTaskPopup}
          onClose={closeDeleteTaskPopup}
          fetchAllTask={fetchAllTask}
        />
      )}
    </div>
  );
}
