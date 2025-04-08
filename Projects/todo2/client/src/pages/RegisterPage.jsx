import { useEffect, useState } from "react";
import { FaEnvelope, FaLock, FaUser, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../styles/authenticate.css";
import { GoogleLogin } from "@react-oauth/google";
import {
  // LoginGoogleApi
  RegisterApi,
  // VerifySessionApi,
} from "../utils/authapi";

const RegisterPage = ({ onRegister }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleResponse = function (data) {
    console.log(data);
    onRegister();
    setTimeout(() => {
      navigate("/tasks");
    }, 500);
  };

  const handleError = function (error) {
    setError(error?.message);
    setTimeout(() => {
      navigate("/login");
    }, 500);
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      RegisterApi({ name, email, password }, handleResponse, handleError);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleSuccess = async (credentialResponse) => {
  //   try {
  //     LoginGoogleApi(
  //       credentialResponse?.credential,
  //       handleResponse,
  //       handleError
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   try {
  //     VerifySessionApi(handleResponse, handleError);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>
          {/* <p>Join us and start your journey</p> */}
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              <FaUser className="form-icon" /> Full Name
            </label>
            <input
              className="auth-input"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="form-icon" /> Email
            </label>
            <input
              className="auth-input"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FaLock className="form-icon" /> Password
            </label>
            <input
              className="auth-input"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              required
            />
            <small className="password-hint">
              Must be at least 8 characters with numbers and symbols
            </small>
          </div>

          <button
            type="submit"
            className="auth-button primary-button"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
            {!isLoading && <FaArrowRight className="button-icon" />}
          </button>
        </form>
        <div className="divider">
          <span>OR</span>
        </div>
        {/* <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => { }}
          theme="outline"
          context="signup"
          text="signup_with"
        /> */}
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>{" "}
        {error && <div className="auth-footer error">{error}</div>}
      </div>
    </div>
  );
};

export default RegisterPage;
