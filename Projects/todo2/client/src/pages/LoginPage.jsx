import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import "../styles/authenticate.css";

import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { VerifySessionApi, LoginApi, LoginGoogleApi } from "../utils/authapi";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function handleResponse(data) {
    console.log(data);
    onLogin();
    navigate("/tasks");
  };

  function handleError(error) {
    setError(error?.message);
    return;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      LoginApi({ email, password }, handleResponse, handleError);
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
  //     setTimeout(() => {
  //       VerifySessionApi(handleResponse, handleError);
  //     }, 2000);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          {/* <p>Sign in to continue your journey</p> */}
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <FaEnvelope className="form-icon" /> Email
            </label>
            <input
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
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="forgot-password cursor-pointer">
            <a>Forgot password?</a>
          </div>

          <button
            type="submit"
            className="auth-button primary-button"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
            {!isLoading && <FaArrowRight className="button-icon" />}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* <GoogleLogin
          // onSuccess={handleSuccess}
          onError={() => { }}
          theme="outline"
          context="signin"
          text="continue_with"
          auto_select={true}
        /> */}

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>

        {error && <div className="auth-footer error">{error}</div>}
      </div>
    </div>
  );
};

export default LoginPage;
