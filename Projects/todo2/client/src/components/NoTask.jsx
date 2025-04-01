import React from "react";
import { userIcon, folderWhite } from "../assets/asset";
export default function NoTask({ onCreateTask }) {
  return (
    <div className="flex flex-col items-center justify-center content-section">
      <div className="content-section-container flex flex-col jusstify-center">
        <img src={userIcon} alt="user with no task" loading="lazy" />
        <h1 className="no-task-primary-text">Woohoo , you're all done</h1>
        <p className="no-task-secondary-text">
          There are no tasks added yet . click button to add a new task
        </p>
        <button
          className="btn btn-purple create-task-btn"
          onClick={onCreateTask}
        >
          <img src={folderWhite} alt="Create task item" />
          Create new task
        </button>
      </div>
    </div>
  );
}
