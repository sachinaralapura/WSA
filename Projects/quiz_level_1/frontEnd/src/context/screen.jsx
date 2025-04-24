import React, { useState, useCallback, useContext } from "react";
const ScreenContext = React.createContext({
  viewScreen: "",
  setViewScreen: () => {},
  showQuestionScreen: () => {},
  showResultScreen: () => {},
  showWelcomeScreen: () => {},
});

export const useScreen = () => {
  const context = useContext(ScreenContext);
  return context;
};

export const ScreenProvider = ({ children }) => {
  const WELCOME_SCREEN = "welcome";
  const QUESTION_SCREEN = "question";
  const RESULT_SCREEN = "result";

  const [viewScreen, setViewScreen] = useState(WELCOME_SCREEN);

  const showQuestionScreen = useCallback(() => {
    setViewScreen(QUESTION_SCREEN);
  }, [setViewScreen]);

  const showResultScreen = useCallback(() => {
    setViewScreen(RESULT_SCREEN);
  }, [setViewScreen]);

  const showWelcomeScreen = useCallback(() => {
    setViewScreen(WELCOME_SCREEN);
  }, [setViewScreen]);

  return (
    <ScreenContext.Provider
      value={{
        viewScreen,
        setViewScreen,
        showQuestionScreen,
        showResultScreen,
        showWelcomeScreen,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
};
