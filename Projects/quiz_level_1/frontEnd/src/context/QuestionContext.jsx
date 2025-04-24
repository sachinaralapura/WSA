import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const QuestionContext = createContext({
  questions: [],
  totalquestion: 0,
  activeQuestion: {},
  activeQuestionId: "",
  activeQuestionNumber: 0,
  numberOfcorrectAnswers: 0,
  setQuestions: () => {},
  activeNextQuestion: () => {},
  setActiveQuestionId: () => {},
  processQuestion: () => {},
  updateQuestionState: (p) => {},
});

export const useQuestion = () => {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [activeQuestionId, setActiveQuestionId] = useState("");

  const processQuestion = useCallback(
    (responseData) => {
      setQuestions(
        responseData.map((question) => {
          return { ...question, hasAttempted: false, isAnswerCorrect: false };
        })
      );
      setActiveQuestionId((p) => responseData[0]._id);
    },
    [setActiveQuestionId, setQuestions]
  );

  // current question
  const activeQuestion = useMemo(
    () => questions.find((ques) => ques._id === activeQuestionId),
    [activeQuestionId, questions]
  );

  // current Question Number (index of questions)
  const activeQuestionNumber = useMemo(() => {
    return questions.findIndex((ques) => ques._id === activeQuestionId) + 1;
  }, [activeQuestionId, questions]);

  // totalQuestion in questions
  const totalquestion = useMemo(() => questions.length, [questions]);

  // update the isAnswerCorrect and hasAttempted
  const updateQuestionState = useCallback(
    (isAnswerCorrect) => {
      setQuestions((p) => {
        return p.map((ques) => {
          return ques._id === activeQuestionId
            ? { ...ques, hasAttempted: true, isAnswerCorrect }
            : ques;
        });
      });
    },
    [setQuestions, activeQuestionId]
  );

  // next question
  const activeNextQuestion = useCallback(() => {
    const currentIndex = questions.findIndex(
      (ques) => ques._id === activeQuestionId
    );
    if (currentIndex !== -1 && currentIndex + 1 < totalquestion) {
      setActiveQuestionId(questions[currentIndex + 1]._id);
    }
  }, [activeQuestionId, questions]);

  // calculate how many questions are answered correctly
  const numberOfcorrectAnswers = useMemo(() => {
    const noOfCorrectAnswers = questions.filter(
      (q) => q.isAnswerCorrect
    ).length;
    return noOfCorrectAnswers;
  }, [questions]);

  // ------------------------------------------
  const contextValue = useMemo(
    () => ({
      questions,
      activeQuestion,
      totalquestion,
      numberOfcorrectAnswers,
      activeQuestionId,
      activeQuestionNumber,
      activeNextQuestion,
      setQuestions,
      processQuestion,
      updateQuestionState,
    }),
    [
      questions,
      activeQuestion,
      totalquestion,
      numberOfcorrectAnswers,
      activeQuestionId,
      activeQuestionNumber,
      activeNextQuestion,
      setQuestions,
      processQuestion,
      updateQuestionState,
    ]
  );

  return (
    <QuestionContext.Provider value={contextValue}>
      {children}
    </QuestionContext.Provider>
  );
};
