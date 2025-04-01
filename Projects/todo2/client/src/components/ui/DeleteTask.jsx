import clsx from "clsx";
import { crossIcon, info } from "../../assets/asset";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import { deleteTaskApi } from "../../utils/taskapi";

export default function DeleteTask({ isOpen, onClose, task, fetchAllTask }) {
  const [loading, setLoading] = useState(false);

  const handleResponse = useCallback(
    function () {
      fetchAllTask();
      onClose();
    },
    [fetchAllTask, onClose]
  );

  const handleError = function (error) {
    console.log(error);
    alert(error);
  };

  const deleteTask = useCallback(
    function () {
      deleteTaskApi(task._id, handleResponse, handleError, setLoading);
    },
    [handleError, handleResponse]
  );
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="delete-task-container">
        <div className="text-right delete-task-header">
          <img
            src={info}
            alt="Info Icon"
            className="delete-popup-info-icon"
          />
          <div className="close-modal-btn" onClick={onClose}>
            <img src={crossIcon} alt="cross popup icon" />
          </div>
        </div>
        <div className="delete-popup-content">
          <p className="delete-task-text">
            Are you Sure you want to delete?
            <br />
            <span className="delete-task-title">{task?.title}</span>
          </p>

          <div className="delete-action-btns">
            <button className="btn cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className={clsx(
                "btn",
                "delete-btn",
                loading && "disable-delete-btn"
              )}
              onClick={deleteTask}
              disabled={loading}
            >
              {loading ? "Deleting" : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
