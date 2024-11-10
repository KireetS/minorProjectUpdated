import React, { useState, useEffect } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { TbArcheryArrow } from "react-icons/tb";
import { BiCoinStack } from "react-icons/bi";
import { FaDollarSign } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./Sidebar.css"


const Sidebar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setVisible(true);
    }
  }, []);

  return (
    visible
    ?
      <aside className="hidden proper-padding-dasboard md:w-fit bg-secondary-color md:py-10 md:px-10 md:flex flex-col h-screen">
        <img src="logo_2.png" alt="logo" width={240} className="logo"/>
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
        </div>
      </aside>
    :
      null
  );
};

export default Sidebar;
