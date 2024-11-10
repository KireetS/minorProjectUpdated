import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import AuthPage from "./Components/Auth/AuthPage";
import Sidebar from "./Components/Sidebar/Sidebar";
import Expenses from "./Components/Expenses/Expenses";
import Goals from "./Components/Goals/Goals";
import Investments from "./Components/Investments/Investments";
import SipCalculator from "./Components/sip/SipCalculator";
import Dashboard from "./Components/Dashboard/Dashboard";

export default function App() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("auth-token");
    if (authToken) {
      setLogin(true);
      navigate("/dashboard");
    } else {
      setLogin(false);
      navigate("/");
    }
  }, [login]);

  return (
    <>
      <ToastContainer />
      <div className="h-screen flex w-full">
        {!login ? (
          <Routes>
            <Route path="/*" element={<AuthPage />} />
          </Routes>
        ) : (
          <>
            <Sidebar />
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/investments" element={<Investments />} />
              <Route path="/sip" element={<SipCalculator />} />
            </Routes>
          </>
        )}
      </div>
    </>
  );
}
