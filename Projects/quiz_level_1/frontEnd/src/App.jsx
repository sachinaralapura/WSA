import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import WelcomeScreen from "./components/WelcomeScreen";
import { useScreen } from "./context/screen";
import "./index.css";

const WELCOME_SCREEN = "welcome";
const QUESTION_SCREEN = "question";
const RESULT_SCREEN = "result";
function App() {
  const { viewScreen } = useScreen();
  return (
    <div>
      {viewScreen === WELCOME_SCREEN && <WelcomeScreen />}
      {viewScreen === QUESTION_SCREEN && <QuestionScreen />}
      {viewScreen === RESULT_SCREEN && <ResultScreen />}
    </div>
  );
}

export default App;
