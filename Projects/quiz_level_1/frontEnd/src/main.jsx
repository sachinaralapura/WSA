import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ScreenProvider } from "./context/screen.jsx";
import { QuestionProvider } from "./context/QuestionContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScreenProvider>
      <QuestionProvider>
        <App />
      </QuestionProvider>
    </ScreenProvider>
  </StrictMode>
);
