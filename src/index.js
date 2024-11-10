import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ToastifyState from "./Contexts/toastifyContext/ToastifyState";
import LoginState from "./Contexts/loginContext/LoginState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastifyState>
        <LoginState>
          <App />
        </LoginState>
      </ToastifyState>
    </BrowserRouter>
  </React.StrictMode>
);
