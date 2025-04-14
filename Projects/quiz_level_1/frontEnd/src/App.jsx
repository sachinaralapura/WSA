import { useCallback, useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import "./index.css";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import { useScreen } from "./context/screen";

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
