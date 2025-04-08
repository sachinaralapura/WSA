import NoTask from "./NoTask";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import TaskList from "./TaskList";
import ViewTask from "./ViewTask";
import Loading from "./ui/Loading";

import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchTaskAPI } from "../utils/taskapi";

const LOADING_SCREEN = "LOADING";
const NO_TASK_SCREEN = "NOTASK";
const TASK_LIST_SCREEN = "TASKLIST";
const EDIT_TASK_SCREEN = "EDITTASK";
const VIEW_TASK_SCREEN = "VIEWTASK";
const CREATE_TASK_SCREEN = "CREATETASK";

export default function TaskMain() {
  const [currentComponent, setCurrentComponent] = useState(LOADING_SCREEN);
  const [tasks, setTasks] = useState([]);
  const [activeTaskId, setActiveTaskId] = useState();
  const [boardView, setBoardView] = useState(false);

  const activeTask = useMemo(
    () => tasks.find((task) => task._id === activeTaskId),
    [tasks, activeTaskId]
  );

  const showScreen = useCallback(function (screen) {
    setCurrentComponent(screen);
  }, []);

  const handleResponse = useCallback(
    function (responseData) {
      const extractedTasks = responseData.data;
      setTasks(extractedTasks);
      if (extractedTasks.length) {
        showScreen(TASK_LIST_SCREEN);
      } else {
        showScreen(NO_TASK_SCREEN);
      }
    },
    [showScreen]
  );

  const handleError = function (errorMessage) {
    alert(errorMessage);
    console.error(errorMessage);
  };

  const fetchAllTask = useCallback(
    function () {
      fetchTaskAPI(handleResponse, handleError);
    },
    [handleResponse]
  );

  useEffect(() => {
    fetchAllTask();
  }, [fetchAllTask]);

  const changeTaskStatus = useCallback(function (id, status) {
    setTasks((prev) => {
      return prev.map((task) => {
        if (task._id === id) {
          return { ...task, status: status };
        }
        return task;
      });
    });
  }, []);

  return (
    <>
      {currentComponent === LOADING_SCREEN && <Loading />}

      <div id="container-div">
        {currentComponent === NO_TASK_SCREEN && (
          <NoTask onCreateTask={() => showScreen(CREATE_TASK_SCREEN)} />
        )}

        {(currentComponent === TASK_LIST_SCREEN ||
          currentComponent === VIEW_TASK_SCREEN) && (
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            boardView={boardView}
            setBoardView={setBoardView}
            setActiveTaskId={setActiveTaskId}
            changeTaskStatus={changeTaskStatus}
            showEditTaskScreen={() => showScreen(EDIT_TASK_SCREEN)}
            showViewTaskScreen={() => showScreen(VIEW_TASK_SCREEN)}
            showCreateTaskScreen={() => showScreen(CREATE_TASK_SCREEN)}
            fetchAllTask={fetchAllTask}
          />
        )}

        {currentComponent === CREATE_TASK_SCREEN && (
          <CreateTask
            onCreateTask={fetchAllTask}
            onCancel={() => showScreen(TASK_LIST_SCREEN)}
          />
        )}

        {currentComponent === VIEW_TASK_SCREEN && (
          <ViewTask
            activeTask={activeTask}
            fetchAllTask={fetchAllTask}
            showEditTaskScreen={() => showScreen(EDIT_TASK_SCREEN)}
            setActiveTaskId={setActiveTaskId}
            onCancel={() => showScreen(TASK_LIST_SCREEN)}
            changeTaskStatus={changeTaskStatus}
          />
        )}

        {currentComponent === EDIT_TASK_SCREEN && (
          <EditTask
            task={activeTask}
            fetchAllTask={fetchAllTask}
            onCancel={() => showScreen(TASK_LIST_SCREEN)}
          />
        )}
      </div>
    </>
  );
}
