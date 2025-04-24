import React, { useCallback, useState } from "react";
import { CheckGreen, QuestionBubble } from "../assets";
import { useScreen } from "../context/screen";
import { Button, Card, QuizLogo } from "./ui";
import { useQuestion } from "../context/QuestionContext";
import { fetchQuestionsApi } from "../utils/api";
import handleError from "../utils/handleError";
export default function WelcomeScreen() {
  const [loading, setLoading] = useState(false);
  const { showQuestionScreen } = useScreen();
  const { processQuestion } = useQuestion();

  const handleResponse = useCallback(
    (responseData) => {
      processQuestion(responseData);
      showQuestionScreen();
    },
    [processQuestion, showQuestionScreen]
  );

  const startQuiz = useCallback(() => {
    fetchQuestionsApi(handleResponse, handleError, setLoading);
  }, [handleError, handleResponse]);

  return (
    <section className="welcome-section">
      <QuizLogo size="large" />
      <Card className="welcome-card">
        <div className="welcome-card-content-top">
          <img src={QuestionBubble} alt="" width={172} />
          <h2>Are you ready?</h2>
          <h3>Let's see how many questions you can answer:</h3>
        </div>
        <ul className="welcome-card-list">
          <li className="list-item">
            <img src={CheckGreen} alt="" />
            There are 30 Questions
          </li>
          <li className="list-item">
            <img src={CheckGreen} alt="" />
            You need to pick 1 answer
          </li>
        </ul>

        <Button
          size="large"
          onClick={startQuiz}
          loadingText="Starting the quiz"
          loading={loading}
        >
          I'm Ready
        </Button>
      </Card>
    </section>
  );
}
