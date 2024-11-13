import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { signup, login } from "../../api/Auth/AuthAPI";
import "./AuthPage.css";
import LoginContext from "../../Contexts/loginContext/LoginContext";

export default function AuthPage({ isSignIn }) {
  const [isSignInState, setIsSignInState] = useState(isSignIn);
  const { setLogin } = useContext(LoginContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState(false);

  let navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: value };
    });
  }

  function toggleSignIn() {
    setIsSignInState(!isSignInState);
  }

  async function handleSignUp(event) {
    event.preventDefault();
    try {
      await signup(formData.name, formData.email, formData.password);
      setIsSignInState(true); // Switch to Sign In view on successful sign-up
    } catch (err) {
      console.log("Signup error:", err);
      setErr(true);
    }
  }

  async function handleSignIn(event) {
    event.preventDefault();
    try {
      const data = await login(formData.email, formData.password);
      console.log("Received login data:", data); // Check this output
      if (data.token) {
        localStorage.setItem("auth-token", data.token);
        setLogin(true);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("in error");
      console.log("Login error:", err);
      setErr(true);
    }
  }

  return (
    <div className="auth-page-body">
      <div
        className={`auth-page-container ${
          isSignInState ? "right-panel-active" : ""
        }`}
      >
        <div className="form-container signUp-container">
          <div className="logo-icon">
            <a href="/" className="logo-link">
              <img src="/logo_black.png" alt="logo" width={180} />
            </a>
          </div>

          <form className="left-box-signUp" onSubmit={handleSignUp}>
            <div className="head">SIGN UP</div>
            <div className="input-with-icon-class">
              <BsFillPersonFill className="auth-page-icon" />
              <input
                type="text"
                name="name"
                className="registerInput"
                placeholder="Name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-with-icon-class">
              <MdEmail />
              <input
                type="email"
                name="email"
                className="registerInput"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-with-icon-class">
              <FaLock />
              <input
                type="password"
                name="password"
                className="registerInput"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <button className="btn auth-btn">SIGN-UP</button>
            {err && <p className="error">You are already registered</p>}
          </form>
        </div>

        <div className="form-container signIn-container">
          <form className="right-box-signIn" onSubmit={handleSignIn}>
            <div className="head">SIGN IN</div>
            <div className="input-with-icon-class">
              <MdEmail />
              <input
                type="email"
                name="email"
                className="registerInput"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-with-icon-class">
              <FaLock />
              <input
                type="password"
                name="password"
                className="registerInput"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button className="btn auth-btn">SIGN-IN</button>

            {err && (
              <p className="error">
                You credentials are invalid please try again
              </p>
            )}
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-panel-left">
              <div className="logo-icon">
                <a href="/" className="logo-link">
                  <img src="/logo_2.png" alt="logo" width={180} />
                </a>
              </div>
              <div className="head-msg">Welcome back to ReelCraft !</div>
              <div className="sub-msg">Are you new here? </div>
              <button onClick={toggleSignIn} className="btn toggle-btn">
                Click Here to Sign-Up
              </button>
            </div>

            <div className="overlay-panel overlay-panel-right">
              <div className="head-msg">
                Let's take care of your finances for you !
              </div>
              <div className="sub-msg">Already have an account? </div>
              <button onClick={toggleSignIn} className="btn toggle-btn">
                Click Here to Sign-In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
