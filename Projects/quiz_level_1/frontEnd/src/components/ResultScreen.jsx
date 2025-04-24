import { useState, useCallback } from "react";
import { Button, Card, QuizLogo, RestartFc } from "./ui";
import { Tropy } from "../assets";
import { useScreen } from "../context/screen";
import handleError from "../utils/handleError";
import { useQuestion } from "../context/QuestionContext";
import { fetchQuestionsApi } from "../utils/api";
export default function ResultScreen() {
  const [loading, setLoading] = useState(false);
  const { showQuestionScreen } = useScreen();
  const { numberOfcorrectAnswers, totalquestion, processQuestion } =
    useQuestion();

  let percent = (numberOfcorrectAnswers / totalquestion) * 100;
  let feedBackText = "YOU COULD DO BETTER";

  if (percent >= 90) {
    feedBackText = "EXCELLENT JOB";
  } else if (percent >= 70) {
    feedBackText = "GOOD JOB";
  } else if (percent >= 50) {
    feedBackText = "YOU DID OK!";
  }

  const handleResponse = useCallback(
    (responseData) => {
      processQuestion(responseData);
      showQuestionScreen();
    },
    [processQuestion, showQuestionScreen]
  );

  const restartQuiz = useCallback(() => {
    fetchQuestionsApi(handleResponse, handleError, setLoading);
  }, [handleError, handleResponse]);

  return (
    <div>
      <section className="result-section">
        <QuizLogo size="small" />
        <Card className={"result-card"}>
          <div className="result-icon-wrapper">
            <img src={Tropy} alt="" />
          </div>
          <h1 className="result-text">{feedBackText}</h1>
          <div className="result-details">
            <span className="correct-answers">{numberOfcorrectAnswers}</span>
            <p className="total-questions">
              Questions
              <br />
              out of <span className="weight-700">{totalquestion}</span>
            </p>
          </div>
          <Button
            size={"large"}
            onClick={restartQuiz}
            loading={loading}
            loadingText="Restarting..."
            icon={<RestartFc />}
            iconPosition="right"
          >
            Restart
          </Button>
        </Card>
      </section>
    </div>
  );
}
