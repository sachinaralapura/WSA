import React, { useCallback, useState } from "react";
import { folder } from "../assets/asset.js";
import TaskTile from "./TaskTile";
import TaskListSideBar from "./TaskListSideBar.jsx";
import clsx from "clsx";
export default function TaskList({
  tasks,
  setTasks,
  fetchAllTask,
  showCreateTaskScreen,
  showEditTaskScreen,
  showViewTaskScreen,
  setActiveTaskId,
  changeTaskStatus,
  boardView,
  setBoardView,
}) {
  const [searchQuery, setSearchQuery] = useState();

  const handleViewTask = useCallback(
    function (taskId) {
      setActiveTaskId(taskId);
      showViewTaskScreen();
    },
    [setActiveTaskId, showViewTaskScreen]
  );
  return (
    <div className="task-list-screen content-section">
      {/* left container sidebar */}
      <div className="task-list-left-container">
        <p className="task-heading">🔥 Tasks</p>
        {/* task sidebar */}
        <TaskListSideBar
          boardView={boardView}
          setBoardView={setBoardView}
          setTasks={setTasks}
        />
      </div>

      {/* Right container for task-list */}
      <div className="task-list-right-container">
        {/* Header with search and add task button */}
        <div className="task-list-right-header">
          {/* search bar component  */}
          <button onClick={showCreateTaskScreen}>
            <img src={folder} alt="Add task Icon" />
            Add New Task
          </button>
        </div>
        {/* task list section */}
        <div
          className={clsx("task-list-right-section", boardView && "board-view")}
        >
          {tasks.map((task) => (
            <TaskTile
              key={`${task._id}-${"task-title"}`}
              task={task}
              onClick={() => handleViewTask(task._id)}
              fetchAllTask={fetchAllTask}
              changeTaskStatus={changeTaskStatus}
              setActiveTaskId={setActiveTaskId}
              showEditTaskScreen={showEditTaskScreen}
              boardView={boardView}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
