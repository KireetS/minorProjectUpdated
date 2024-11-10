import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [investmentDuration, setInvestmentDuration] = useState(0);
  const [expectedReturnRate, setExpectedReturnRate] = useState(0);
  const [oneTimeInvestment, setOneTimeInvestment] = useState(0);
  const [data, setData] = useState([]);

  const calculateSIP = () => {
    const totalMonths = investmentDuration * 12;
    const sipData = [];
    let totalInvestment = oneTimeInvestment;

    for (let month = 1; month <= totalMonths; month++) {
      totalInvestment += monthlyInvestment;
      const returnAmount =
        totalInvestment * Math.pow(1 + expectedReturnRate / 100 / 12, month);
      sipData.push({
        month,
        totalInvestment: parseFloat(totalInvestment.toFixed(2)),
        returnAmount: parseFloat(returnAmount.toFixed(2)),
      });
    }

    setData(sipData);
  };

  const handleCalculate = (e) => {
    e.preventDefault(); // Prevent the default form submission
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

        {data.length > 0 && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
              <XAxis
                dataKey="month"
                label={{ value: "Months", position: "bottom", fill: "#ffffff" }}
                stroke="#ffffff"
              />
              <YAxis
                label={{
                  value: "Amount ($)",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#ffffff",
                }}
                stroke="#ffffff"
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#4B5563", border: "none" }}
              />
              <Line
                type="monotone"
                dataKey="totalInvestment"
                stroke="#1c64f2" // Blue color
                name="Total Investment"
                strokeWidth={2}
                animationDuration={500}
                dot={{ stroke: "#1c64f2", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="returnAmount"
                stroke="#4caf50" // Green color
                name="Expected Return"
                strokeWidth={2}
                animationDuration={500}
                dot={{ stroke: "#4caf50", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default SipCalculator;
