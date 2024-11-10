import React, { useContext, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { signup } from "../../api/Auth/AuthAPI";
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const [showCPassword, setShowCPassword] = useState(false);
  const toggleCPasswordVisibility = () => {
    setShowCPassword((prev) => !prev);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [cpassword, setCPass] = useState("");
  const { success, failure } = useContext(ToastifyContext);
  const buttonClickhandler = async () => {
    if (password === cpassword) {
      try {
        await signup(name, email, password);
      } catch (e) {
        failure("Sorry , problem connecting with server");
      }
      success("User Created Successfully");
    } else {
      failure("Passwords need to match");
    }
  };
  return (
    <div className="flex items-center justify-center flex-col space-y-6 w-full ">
      <div className="bg-transparent flex items-center justify-center text-2xl font-bold text-white md:text-3xl">
        SignUp
      </div>
      <div className="bg-secondary-color w-[75%] p-5 text-white font-semibold flex flex-col items-center justify-center space-y-4 rounded-lg md:w-[60%] md:p-7 lg:w-[40%]">
        <div className="w-full flex flex-col justify-center items-start space-y-2 md:space-y-3 md:text-lg">
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="bg-primary-color outline-none rounded-md p-2 font-normal w-full md:p-3"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start space-y-2 md:space-y-3 md:text-lg">
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-primary-color outline-none rounded-md p-2 font-normal w-full md:p-3"
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start space-y-2 md:space-y-3 md:text-lg relative">
          <label htmlFor="">Password</label>
          <input
            value={password}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type={showPassword ? "text" : "password"}
            className="bg-primary-color outline-none rounded-md p-2 font-normal w-full md:p-3"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-9 text-white md:top-12 md:right-4"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="w-full flex flex-col justify-center items-start space-y-2 md:space-y-3 md:text-lg relative">
          <label htmlFor="">Confirm Password</label>
          <input
            value={cpassword}
            onChange={(e) => {
              setCPass(e.target.value);
            }}
            type={showCPassword ? "text" : "password"}
            className="bg-primary-color outline-none rounded-md p-2 font-normal w-full md:p-3"
          />
          <button
            type="button"
            onClick={toggleCPasswordVisibility}
            className="absolute right-2 top-9 text-white md:top-12 md:right-4"
          >
            {showCPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            className="p-2 bg-yellow-500 text-white font-bold rounded-lg md:p-3 md:text-lg"
            onClick={buttonClickhandler}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
