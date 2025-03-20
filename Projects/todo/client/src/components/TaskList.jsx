import React, { useCallback } from "react";
import { FolderIcon } from "../assets/asset";
import TaskTile from "./TaskTile";

export default function TaskList({
  tasks,
  fetchAllTask,
  showCreateTaskScreen,
  showEditTaskScreen,
  showViewTaskScreen,
  setActiveTask,
}) {
  const viewTask = useCallback(
    function (task) {
      setActiveTask(task);
      showViewTaskScreen();
    },
    [setActiveTask, showViewTaskScreen]
  );

  return (
    <div className="task-list-screen content-section">
      <div className="content-section-container">
        <div className="task-list-header-main">
          <p className="task-heading">🔥 Task</p>
          <button
            className="add-task-btn cursor-pointer"
            onClick={showCreateTaskScreen}
          >
            <img src={FolderIcon} alt="Add task icon" />
            Add New task
          </button>
        </div>
        <div className="task-list-container">
          {tasks?.map((task) => (
            <TaskTile
              key={task._id}
              task={task}
              fetchAllTask={fetchAllTask}
              setActiveTask={setActiveTask}
              showEditTaskScreen={showEditTaskScreen}
              onClick={() => viewTask(task)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
