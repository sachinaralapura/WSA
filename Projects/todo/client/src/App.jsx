import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import MainPage from "./pages/MainPage";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const onAuthenticate = () => setIsAuthenticated(true)
  return (
    < Routes >
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage onLogin={onAuthenticate} />} />
      <Route path="/register" element={<RegisterPage onRegister={onAuthenticate} />} />
      <Route path="/tasks" element={isAuthenticated ? <MainPage /> : <Navigate to="/login" />} />
    </Routes >
  );
}

export default App;
