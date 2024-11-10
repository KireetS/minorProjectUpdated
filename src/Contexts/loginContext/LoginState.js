import { useState } from "react";
import LoginContext from "./LoginContext";
const LoginState = (props) => {
  const [login, setLogin] = useState(
    localStorage.getItem("authToken") ? true : false
  );
  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginState;
