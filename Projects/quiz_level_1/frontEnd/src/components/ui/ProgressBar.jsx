import React, { useMemo } from "react";
import clsx from "clsx";
import { useQuestion } from "../../context/QuestionContext";

export default function ProgressBar() {
  const { totalquestion, activeQuestionNumber } = useQuestion();

  const isFinalQuestion = useMemo(
    () => activeQuestionNumber === totalquestion,
    [activeQuestionNumber, totalquestion]
  );

  const ProgressText = useMemo(
    () => `${((activeQuestionNumber / totalquestion) * 100).toFixed(2)}%`,
    [activeQuestionNumber, totalquestion]
  );
  return (
    <progress
      value={activeQuestionNumber}
      max={totalquestion}
      className={clsx("progress-bar", isFinalQuestion && "final-question")}
    >
      {ProgressText}
    </progress>
  );
}
