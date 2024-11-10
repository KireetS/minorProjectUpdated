import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Navbar from "./Navbar";

const Auth = () => {
  return (
    <div className="bg-primary-color flex w-full min-h-screen h-auto">
      <Navbar />
      <div className="flex-1 md:pt-12 flex items-center justify-center">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default Auth;
