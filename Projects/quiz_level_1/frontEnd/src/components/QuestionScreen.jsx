import clsx from "clsx";
import React, { useMemo, useState } from "react";
import { Button, Card, NextArrowIcon, ProgressBar, QuizLogo } from "./ui";
import { Correct, Incorrect } from "../assets";

function QuestionScreen() {
  const [userSelected, setUserSelected] = useState("");

  const activeQuestion = {
    _id: "question Id",
    question: "What is Capital of Karnataka",
    options: [
      { id: 1, value: "Bengaluru" },
      { id: 2, value: "Delhi" },
      { id: 3, value: "Mumbai" },
      { id: 4, value: "Kolkata" },
    ],
    answerId: 1,
  };

  // If user selected any option
  const hastAttempted = Boolean(userSelected);

  const isAnswerCorrect = useMemo(() => {
    return Boolean(activeQuestion.answerId === userSelected);
  }, [userSelected]);

  return (
    <section className="question-section">
      <QuizLogo size="small" />
      <ProgressBar />
      <div className="question-content">
        <Card className="question-card">
          <div className="question-number">1/5</div>
          <p className="question-text">{activeQuestion.question}</p>
          <div className="question-options">
            {activeQuestion.options.map((option) => {
              const isSelected = option.id === userSelected;
              const isOptionCorrect = isSelected && isAnswerCorrect;
              const isOptionInCorrect = isSelected && !isAnswerCorrect;

              return (
                <button
                  className={clsx(
                    "option",
                    !hastAttempted && "not-answered",
                    isSelected && "selected",
                    isOptionCorrect && "correct-answer",
                    isOptionInCorrect && "incorrect-answer"
                  )}
                  key={option.id}
                  onClick={() => setUserSelected(option.id)}
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
            disabled={!hastAttempted}
            icon={<NextArrowIcon />}
            iconPosition="right"
            size="small"
          >
            Next
          </Button>
        </Card>
      </div>
    </section>
  );
}

export default QuestionScreen;
