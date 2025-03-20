import NoTask from "./NoTask";
import CreateTask from "./CreateTask";
import EditTask from "./EditTask";
import TaskList from "./TaskList";
import ViewTask from "./ViewTask";
import DeleteTask from "./ui/DeleteTask";
import Loading from "./ui/Loading";

import { useCallback, useEffect, useState } from "react";
import { fetchTaskAPI } from "../utils/taskapi";

const LOADING_SCREEN = "LOADING";
const NO_TASK_SCREEN = "NOTASK";
const TASK_LIST_SCREEN = "TASKLIST";
const EDIT_TASK_SCREEN = "EDITTASK";
const VIEW_TASK_SCREEN = "VIEWTASK";
const CREATE_TASK_SCREEN = "CREATETASK";
const DELETE_TASK_SCREEN = "DELETETASK";

export default function TaskMain() {
  const [currentComponent, setCurrentComponent] = useState(LOADING_SCREEN);
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState();

  const showScreen = useCallback(function (screen) {
    setCurrentComponent(screen);
  }, []);

  const handleResponse = useCallback(
    function (responseData) {
      const extractedTasks = responseData.tasks;
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

  return (
    <>
      {currentComponent === LOADING_SCREEN && <Loading />}

      <div id="container-div">
        {currentComponent === NO_TASK_SCREEN && (
          <NoTask onCreateTask={() => showScreen(CREATE_TASK_SCREEN)} />
        )}

        {currentComponent === TASK_LIST_SCREEN && (
          <TaskList
            tasks={tasks}
            fetchAllTask={fetchAllTask}
            showCreateTaskScreen={() => showScreen(CREATE_TASK_SCREEN)}
            showEditTaskScreen={() => showScreen(EDIT_TASK_SCREEN)}
            showViewTaskScreen={() => showScreen(VIEW_TASK_SCREEN)}
            setActiveTask={setActiveTask}
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
            onCancel={() => showScreen(TASK_LIST_SCREEN)}
            showEditTaskScreen={() => showScreen(EDIT_TASK_SCREEN)}
            setActiveTask={setActiveTask}
          />
        )}

        {currentComponent === EDIT_TASK_SCREEN && (
          <EditTask
            task={activeTask}
            fetchAllTask={fetchAllTask}
            onCancel={() => showScreen(TASK_LIST_SCREEN)}
          />
        )}
        {/* {currentComponent === DELETE_TASK_SCREEN && <DeleteTask />} */}
      </div>
    </>
  );
}
