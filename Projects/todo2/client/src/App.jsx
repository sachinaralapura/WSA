import { Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import "./styles/index.css";

import { useState } from "react";
function App() {
    const [authenticated, setAuthenticated] = useState(false);
    const handleAuthenticate = () => {
        setAuthenticated(true);
    };

    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/login"} replace />} />
            <Route
                path="/login"
                element={<LoginPage onLogin={handleAuthenticate} />}
            />
            <Route
                path="/register"
                element={<RegisterPage onRegister={handleAuthenticate} />}
            />
            <Route path="/main" element={authenticated && <MainPage />} />
        </Routes>
    );
}

export default App;
