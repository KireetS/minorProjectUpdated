import ToastifyContext from "./ToastifyContext";
import { Slide, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const ToastifyState = (props) => {
  const success = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };

  const failure = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });
  };
  return (
    <ToastifyContext.Provider value={{ success, failure }}>
      {props.children}
    </ToastifyContext.Provider>
  );
};

export default ToastifyState;
