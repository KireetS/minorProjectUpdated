import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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
    let totalInvestment = oneTimeInvestment;
    let monthlyData = [];

    for (let month = 1; month <= totalMonths; month++) {
      totalInvestment += monthlyInvestment;
      const returnAmount =
        totalInvestment * Math.pow(1 + expectedReturnRate / 100 / 12, month);

      monthlyData.push({
        month,
        investment: totalInvestment,
        value: returnAmount,
      });
    }

    setData(monthlyData);
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
              Monthly Investment Amount (₹)
            </label>
            <input
              type="number"
              className="mt-1 block w-full bg-primary-color text-white border-none rounded-md shadow-sm focus:border-none focus:ring-0 p-2"
              value={monthlyInvestment || ""}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Investment Duration (Years)
            </label>
            <input
              type="number"
              className="mt-1 block w-full bg-primary-color text-white border-none rounded-md shadow-sm focus:border-none focus:ring-0 p-2"
              value={investmentDuration || ""}
              onChange={(e) => setInvestmentDuration(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Expected Annual Return Rate (%)
            </label>
            <input
              type="number"
              className="mt-1 block w-full bg-primary-color text-white border-none rounded-md shadow-sm focus:border-none focus:ring-0 p-2"
              value={expectedReturnRate || ""}
              onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              One-Time Investment (₹)
            </label>
            <input
              type="number"
              className="mt-1 block w-full bg-primary-color text-white border-none rounded-md shadow-sm focus:border-none focus:ring-0 p-2"
              value={oneTimeInvestment || ""}
              onChange={(e) => setOneTimeInvestment(Number(e.target.value))}
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
              <LineChart data={data}>
                <CartesianGrid
                  strokeDasharray="2 2"
                  stroke="#333"
                  opacity={0.5}
                />
                <XAxis
                  dataKey="month"
                  stroke="#e2e8f0"
                  label={{
                    value: "Months",
                    position: "insideBottom",
                    fill: "#e2e8f0",
                    offset: -5,
                  }}
                />
                <YAxis
                  stroke="#e2e8f0"
                  label={{
                    value: "Amount (₹)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#e2e8f0",
                    offset: -20, // Add offset to create space between label and numbers
                  }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#4B5563",
                    border: "none",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="investment"
                  stroke="#facc15"
                  name="Total Investment"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#facc15" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22c55e"
                  name="Total Value"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#22c55e" }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;
