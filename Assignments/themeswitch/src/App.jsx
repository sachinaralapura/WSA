import "./index.css";
import Header from "./components/Header";
import { useTask } from "./context/taskContext";
function App() {
  const { todos } = useTask();
  return (
    <>
      <Header></Header>
      {todos.map((todo) => (
        <h1 key={todo.title}>{todo.title}</h1>
      ))}
    </>
  );
}

export default App;
