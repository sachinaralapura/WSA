import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ScreenProvider } from "./context/screen.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ScreenProvider>
      <App />
    </ScreenProvider>
  </StrictMode>
);
