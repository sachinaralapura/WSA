import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext({
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  toggleTask: () => {},
});

export function useTask() {
  const context = useContext(TaskContext);
  return context;
}
// Create the provider component
export const TaskProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem("todos"));
    if (storedValue) {
      return storedValue;
    }
    return [
      { title: "Wash", completed: false },
      { title: "pee", completed: true },
    ];
  });

  // Add a new task
  const addTask = (task) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...task }]);
  };

  // Remove a task
  const removeTask = (id) => {
    setTodos((prev) => prev.filter((task) => task.id !== id));
  };

  // Toggle completion
  const toggleTask = (id) => {
    setTodos((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    const storedValue = JSON.parse(localStorage.getItem("todos"));
    if (storedValue) {
      setTodos(storedValue);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <TaskContext.Provider value={{ todos, addTask, removeTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};
