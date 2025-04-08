import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useState } from "react";
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const handleAuthenticate = () => {
    setAuthenticated(true);
  };

  return (
   <MainPage></MainPage>
  );
}

export default App;
