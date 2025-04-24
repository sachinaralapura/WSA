import clsx from "clsx";
import React, { act, useCallback, useMemo, useState } from "react";
import { Button, Card, NextArrowIcon, ProgressBar, QuizLogo } from "./ui";
import { Correct, Incorrect } from "../assets";
import { useQuestion } from "../context/QuestionContext";
import { validateAnswerApi } from "../utils/api";
import handleError from "../utils/handleError";
import { useScreen } from "../context/screen";

function QuestionScreen() {
  const [userSelected, setUserSelected] = useState("");
  const {
    activeQuestion,
    activeQuestionNumber,
    totalquestion,
    activeNextQuestion,
    updateQuestionState,
  } = useQuestion();

  const { showResultScreen } = useScreen();
  const [loading, setLoading] = useState(false);

  // If user selected any option
  const hastAttempted = Boolean(userSelected);

  const handleResponse = useCallback(
    (responseData) => {
      const isCorrectAnswer = responseData.status;
      if (isCorrectAnswer) {
        updateQuestionState(isCorrectAnswer);
      }
    },
    [updateQuestionState]
  );

  const handleOptionClick = useCallback((selectedOption) => {
    setUserSelected(selectedOption.id);
    // validate the answer
    validateAnswerApi(
      activeQuestion._id,
      selectedOption,
      handleResponse,
      handleError,
      setLoading
    );
  });

  const handleNext = useCallback(() => {
    if (finalQuestion) {
      showResultScreen();
    }
    setUserSelected("");
    activeNextQuestion();
  });

  const finalQuestion = useMemo(
    () => activeQuestionNumber === totalquestion,
    [activeQuestionNumber]
  );

  return (
    <section className="question-section">
      <QuizLogo size="small" />
      <ProgressBar />
      <div className="question-content">
        <Card className="question-card">
          <div className="question-number">{`${activeQuestionNumber} / ${totalquestion}`}</div>
          <p className="question-text">{activeQuestion?.question}</p>
          <div className="question-options">
            {activeQuestion.options.map((option) => {
              const isSelected = option.id === userSelected;
              const isOptionCorrect =
                isSelected && activeQuestion.isAnswerCorrect;
              const isOptionInCorrect =
                isSelected && !activeQuestion.isAnswerCorrect;
              const isLoading = isSelected && loading;
              return (
                <button
                  className={clsx(
                    "option",
                    !hastAttempted && "not-answered",
                    isLoading && "loading",
                    isOptionCorrect && "correct-answer",
                    isOptionInCorrect && "incorrect-answer"
                  )}
                  key={`${activeQuestion._id}-${option.id}`}
                  onClick={() => handleOptionClick(option)}
                  disabled={hastAttempted}
                >
                  {option.value}
                  {isSelected ? (
                    <span
                      className={clsx(
                        isOptionCorrect && "correct-radio",
                        isOptionInCorrect && "incorrect-radio"
                      )}
                    >
                      {isOptionCorrect && <img src={Correct} alt="correct" />}
                      {isOptionInCorrect && (
                        <img src={Incorrect} alt="incorrect" />
                      )}
                    </span>
                  ) : (
                    <span className="unattempted-radio" />
                  )}
                </button>
              );
            })}
          </div>
          <Button
            onClick={handleNext}
            disabled={!hastAttempted}
            icon={<NextArrowIcon />}
            iconPosition="right"
            size="small"
          >
            {finalQuestion ? "Submit" : "Next"}
          </Button>
        </Card>
      </div>
    </section>
  );
}

export default QuestionScreen;
