import React, { useContext, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";
import { login } from "../../api/Auth/AuthAPI";
import LoginContext from "../../Contexts/loginContext/LoginContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");

  const { success, failure } = useContext(ToastifyContext);
  const { setLogin } = useContext(LoginContext);
  const handleLogin = async () => {
    try {
      const userData = await login(email, password);
      success("Login successful!");

      const authToken = userData.token;

      localStorage.setItem("authToken", authToken); // Store the token in local storage

      navigate("/dashboard");
      setLogin(true);
      success("happened");
      console.log(userData); // Example of handling the returned data
    } catch (error) {
      failure("Login failed. Please check your credentials.");
    }
  };
  return (
    <div className="flex items-center justify-center flex-col space-y-6 w-full md:space-y-9">
      <div className="bg-transparent flex items-center justify-center text-2xl font-bold text-white md:text-3xl">
        Login
      </div>
      <div className="bg-secondary-color w-[75%] p-5 text-white font-semibold flex flex-col items-center justify-center space-y-4 rounded-lg md:w-[60%] md:p-8 md:space-y-6 lg:w-[40%]">
        <div className="w-full flex flex-col justify-center items-start space-y-2 md:space-y-4 md:text-lg">
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-primary-color outline-none rounded-md p-2 font-normal w-full md:p-4"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start space-y-2 md:space-y-4 md:text-lg relative">
          <label htmlFor="">Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type={showPassword ? "text" : "password"}
            className="bg-primary-color outline-none rounded-md p-2 font-normal w-full md:p-4"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-9 text-white md:top-12 md:right-4"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            className="p-2 bg-yellow-500 text-white font-bold rounded-lg md:p-3 md:text-lg"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>

      <div className="bg-transparent flex items-center justify-center text-lg  text-white font-normal">
        Don't have an Account ? {"   "}
        <Link to={"/signup"} className="font-bold text-yellow-500 px-2 md:px-4">
          {" "}
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
