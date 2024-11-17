import React, { useState, useEffect, useContext } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { TbArcheryArrow } from "react-icons/tb";
import { BiCoinStack } from "react-icons/bi";
import { FaDollarSign } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import LoginContext from "./../../Contexts/loginContext/LoginContext";
import { CgInsights } from "react-icons/cg";
import { MdMenuBook } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";

const Sidebar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { setLogin } = useContext(LoginContext);

  useEffect(() => {
    if (localStorage.getItem("auth-token")) {
      setVisible(true);
    }
  }, []);

  return visible ? (
    <aside className="hidden proper-padding-dasboard md:w-fit bg-secondary-color md:py-10 md:px-10 md:flex flex-col h-screen">
      <img src="logo_2.png" alt="logo" width={240} className="logo" />
      <div className="text-white font-semibold flex flex-col  items-start justify-center space-y-6 text-lg">
        <Link to={"/dashboard"} className="flex space-x-3 dashboard-entry">
          <MdSpaceDashboard className="dashboard-icon" />
          <span className="dashboard-text">Dashboard</span>
        </Link>
        <Link to={"/expenses"} className="flex space-x-3 dashboard-entry">
          <FaDollarSign className="dashboard-icon" />
          <span className="dashboard-text">Expenses</span>
        </Link>
        <Link to={"/goals"} className="flex space-x-3 dashboard-entry">
          <TbArcheryArrow className="dashboard-icon" />
          <span className="dashboard-text">Goals</span>
        </Link>
        <Link to={"/investments"} className="flex space-x-3 dashboard-entry">
          <FaChartLine className="dashboard-icon" />
          <span className="dashboard-text">Investments</span>
        </Link>
        <Link to={"/sip"} className="flex space-x-3 dashboard-entry">
          <BiCoinStack className="dashboard-icon" />
          <span className="dashboard-text">SIP calculator</span>
        </Link>
        <Link to={"/suggestions"} className="flex space-x-3 dashboard-entry">
          <CgInsights className="dashboard-icon" />
          <span className="dashboard-text">Insight</span>
        </Link>
        <Link to={"/learning"} className="flex space-x-3 dashboard-entry">
          <MdMenuBook className="dashboard-icon" />
          <span className="dashboard-text">Learning</span>
        </Link>
        <div
          onClick={() => {
            localStorage.removeItem("auth-token");
            setLogin(false);
            navigate("/");
          }}
          className="flex space-x-3 dashboard-entry cursor-pointer"
        >
          <PiSignOutBold className="dashboard-icon" />
          <span className="dashboard-text">Sign Out</span>
        </div>
      </div>
    </aside>
  ) : null;
};

export default Sidebar;
