import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [investmentDuration, setInvestmentDuration] = useState(0);
  const [expectedReturnRate, setExpectedReturnRate] = useState(0);
  const [oneTimeInvestment, setOneTimeInvestment] = useState(0);
  const [data, setData] = useState([]);

  const calculateSIP = () => {
    const totalMonths = investmentDuration * 12;
    let totalInvestment = oneTimeInvestment;
    let totalReturnAmount = 0;

    for (let month = 1; month <= totalMonths; month++) {
      totalInvestment += monthlyInvestment;
      const returnAmount =
        totalInvestment * Math.pow(1 + expectedReturnRate / 100 / 12, month);
      totalReturnAmount = returnAmount; // Final value after all months
    }

    // Pie chart data
    const chartData = [
      { name: "Total Investment", value: totalInvestment },
      { name: "Expected Return", value: totalReturnAmount - totalInvestment },
    ];

    setData(chartData);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    calculateSIP();
  };

  return (
    <div className="bg-primary-color flex-1 h-screen p-5 md:p-10 overflow-y-scroll vscrollbar">
      <div className="bg-secondary-color p-5 rounded-lg shadow-md">
        <h2 className="text-white text-2xl font-bold mb-4">SIP Calculator</h2>
        <form
          onSubmit={handleCalculate}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        >
          <div>
            <label className="block text-sm font-medium text-white">
              Monthly Investment Amount ($)
            </label>
            <input
              type="number"
              className="mt-1 block w-full bg-primary-color text-white border-none rounded-md shadow-sm focus:border-none focus:ring-0 p-2"
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && monthlyInvestment === 0) {
                  setMonthlyInvestment("");
                }
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Investment Duration (Years)
            </label>
            <input
              type="number"
              className="mt-1 block w-full bg-primary-color text-white border-none rounded-md shadow-sm focus:border-none focus:ring-0 p-2"
              value={investmentDuration}
              onChange={(e) => setInvestmentDuration(Number(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && investmentDuration === 0) {
                  setInvestmentDuration("");
                }
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Expected Annual Return Rate (%)
            </label>
            <input
              type="number"
              className="mt-1 block w-full bg-primary-color text-white border-none rounded-md shadow-sm focus:border-none focus:ring-0 p-2"
              value={expectedReturnRate}
              onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && expectedReturnRate === 0) {
                  setExpectedReturnRate("");
                }
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              One-Time Investment ($)
            </label>
            <input
              type="number"
              className="mt-1 block w-full bg-primary-color text-white border-none rounded-md shadow-sm focus:border-none focus:ring-0 p-2"
              value={oneTimeInvestment}
              onChange={(e) => setOneTimeInvestment(Number(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && oneTimeInvestment === 0) {
                  setOneTimeInvestment("");
                }
              }}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Calculate
            </button>
          </div>
        </form>

        <div className="p-4 w-full">
          {data.length > 0 && (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Legend iconSize={10} iconType="circle" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#4B5563", border: "none" }}
                />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  <Cell key="investment" fill="#1c64f2" />
                  <Cell key="return" fill="#4caf50" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;
