import { useEffect, useState, useCallback, useActionState } from "react";
import Modal from "./ui/Modal";
import {
  blueChecked,
  alarmClock,
  crossIcon,
  editIcon,
  deleteIcon,
  redTag,
} from "../assets/asset";
import moment from "moment";
import DeleteTask from "./ui/DeleteTask";
import StatusDropDown from "./ui/StatusDropDown";
import LabelSelector from "./ui/LabelSelector";
export default function ViewTask({
  activeTask,
  setActiveTaskId,
  fetchAllTask,
  showEditTaskScreen,
  onCancel,
  changeTaskStatus,
}) {
  const [showDeleteTaskPopup, setShowDeleteTaskPopup] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState(activeTask.labels);

  const closeDeleteTaskPopup = function () {
    setShowDeleteTaskPopup(false);
  };
  const openDeleteTaskPopup = function (e) {
    e.stopPropagation();
    setShowDeleteTaskPopup(true);
  };
  const handleEditTask = useCallback(function (e) {
    e.stopPropagation();
    setActiveTaskId(activeTask._id);
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
          <div className="flex">
            <StatusDropDown
              value={activeTask.status}
              taskId={activeTask._id}
              changeTaskStatus={changeTaskStatus}
            />
            <div className="close-modal-btn" onClick={onCancel}>
              <img src={crossIcon} alt="close popup btn" />
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="view-task-left-section">
            <pre className="view-task-description">
              {activeTask?.description}
            </pre>
            {selectedLabels.length ? (
              <span className="labels-icon-wrapper">
                <img src={redTag} alt="label icon" />
                <span className="lables-row">
                  {selectedLabels.map((label) => {
                    return (
                      <span key={`${activeTask._id}-${label}`}>{label}  </span>
                    );
                  })}
                </span>
              </span>
            ) : null}
          </div>
          <div className="view-task-right-section">
            {activeTask.due_date && (
              <div className="view-task-info-box">
                <p className="label-14">Due Date</p>
                <div className="flex date-container">
                  <img src={alarmClock} alt="clock Icon" />
                  <p className="date-text">
                    {moment(activeTask?.due_date).format("DD MMM YYYY")}
                  </p>
                </div>
              </div>
            )}

            <LabelSelector
              task={activeTask}
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
            />

            <div
              className="view-task-info-box flex clickable"
              onClick={handleEditTask}
            >
              <img src={editIcon} alt="Edit task Icon" width={16} height={16} />
              <p className="label-12">Edit task</p>
            </div>

            <div
              className="view-task-info-box flex clickable"
              onClick={openDeleteTaskPopup}
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
