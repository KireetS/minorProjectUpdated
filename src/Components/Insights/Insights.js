import React, { useContext, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { getExpenses, getExpensesYear } from "../../api/Finances/Expenses";
import { getGoals } from "../../api/Finances/Goals";
import { getInvestments } from "../../api/Finances/Investments";
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";

const Insights = () => {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [income, setIncome] = useState(0);
  const [insights, setInsights] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [goals, setGoals] = useState([]);
  const [investments, setInvestments] = useState([]);
  const { success, failure } = useContext(ToastifyContext);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "All",
  ];

  const years = ["2024", "2023", "2022"];

  const fetchData = async () => {
    try {
      let resp;
      if (selectedMonth === "All") {
        resp = await getExpensesYear(selectedYear, "All");
      } else {
        resp = await getExpenses(
          months.indexOf(selectedMonth),
          selectedYear,
          "All"
        );
      }
      setExpenses(resp);

      const goalsResp = await getGoals();
      setGoals(goalsResp);

      const investmentsResp = await getInvestments();
      setInvestments(investmentsResp);

      calculateInsights(resp); // Calculate insights after fetching expenses
    } catch (e) {
      failure("Failed to load data");
    }
  };

  const calculateInsights = (expenseData) => {
    const totalExpenses = expenseData.reduce(
      (acc, expense) => acc + expense.amount,
      0
    );
    const savings = income - totalExpenses;
    const savingsRate = ((savings / income) * 100).toFixed(2);

    // Generate a financial score based on savings rate
    const financialScore =
      savingsRate >= 20
        ? "Excellent"
        : savingsRate >= 10
        ? "Good"
        : "Needs Improvement";

    setInsights({ savingsRate, financialScore });
  };

  // Prepare data for Recharts
  const expenseData = expenses.map((expense) => ({
    name: expense.category,
    amount: expense.amount,
  }));

  const incomeData = [
    {
      name: "Savings",
      value: income - expenses.reduce((acc, exp) => acc + exp.amount, 0),
    },
    {
      name: "Expenses",
      value: expenses.reduce((acc, exp) => acc + exp.amount, 0),
    },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="bg-primary-color flex-1 h-screen p-5 md:p-10 overflow-y-scroll vscrollbar">
      <div className="w-full flex items-center justify-between space-x-4 py-3 px-0">
        <h1 className="text-white text-2xl font-semibold">
          Financial Insights
        </h1>
      </div>

      <div className="mt-6 bg-secondary-color p-6 rounded-lg shadow-md">
        <div className="flex space-x-4 mb-6">
          <div className="w-1/2">
            <label className="text-white font-semibold">Select Month</label>
            <select
              className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="w-1/2">
            <label className="text-white font-semibold">Select Year</label>
            <select
              className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-white font-semibold">Enter Your Income</label>
          <input
            type="number"
            className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white"
            placeholder="Enter income for the selected period"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
          />
        </div>

        <button
          className="w-full py-3 mt-4 bg-yellow-500 text-white rounded-lg font-semibold"
          onClick={fetchData} // Fetch data and calculate insights on button click
        >
          Get Insights
        </button>

        {insights && (
          <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md text-white">
            <h2 className="text-xl font-semibold mb-4">
              Your Financial Insights
            </h2>
            <p>Savings Rate: {insights.savingsRate}%</p>
            <p>Financial Score: {insights.financialScore}</p>
          </div>
        )}

        {/* Expense Bar Chart */}
        <div className="mt-6">
          <h2 className="text-white text-xl font-semibold mb-4">
            Expense Breakdown
          </h2>
          <BarChart width={500} height={300} data={expenseData}>
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Income Distribution Pie Chart */}
        <div className="mt-6">
          <h2 className="text-white text-xl font-semibold mb-4">
            Income Distribution
          </h2>
          <PieChart width={400} height={400}>
            <Pie
              data={incomeData}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {incomeData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Insights;
