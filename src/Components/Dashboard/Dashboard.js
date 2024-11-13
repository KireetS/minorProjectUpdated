import React, { useState, useEffect, useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import {
  getExpenses,
  getExpensesYear,
  getCategories,
} from "../../api/Finances/Expenses";
import { getInvestments } from "../../api/Finances/Investments";
import { getGoals } from "../../api/Finances/Goals";
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";
import { formatDate } from "../../Utils/Helper";
import { getUser } from "../../api/Auth/AuthAPI";
const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [expenseData, setExpenseData] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [investmentData, setInvestmentData] = useState([]);
  const [goals, setGoals] = useState([]);
  const { failure } = useContext(ToastifyContext);
  const [categories, setCategories] = useState([]);
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1"];
  const months = [
    "All",
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
  ];

  // Fetch expenses based on the selected year and month
  const fetchExpenses = async () => {
    try {
      let resp;
      if (selectedMonth === "All") {
        resp = await getExpensesYear(selectedYear);
      } else {
        resp = await getExpenses(months.indexOf(selectedMonth), selectedYear);
      }
      const categoriesData = await getCategories();
      setCategories(categoriesData.data);
      setExpenseData(resp);
    } catch (e) {
      console.error("failure in loading expenses");
    }
  };
  const fetchGoals = async () => {
    try {
      const resp = await getGoals(); // Fetch goals from your API
      setGoals(resp);
    } catch (e) {
      failure("Failed to load goals");
    }
  };
  const fetchInvestments = async () => {
    try {
      const resp = await getInvestments(); // Fetch investments from your API
      setInvestments(resp);
    } catch (e) {
      failure("Failed to load investments");
    }
  };
  const fetchInvestmentsbyCategory = async () => {
    try {
      const user = await getUser(); // Fetch the user data to get investment types
      const investmentTypes = user.investmentTypes;

      // Fetch all investments
      const investments = await getInvestments();
      console.log(investments);
      // Aggregate investments by type
      const investmentData = investmentTypes.map((type) => ({
        name: type.name,
        value: investments
          .filter((investment) => investment.investmentType === type.name)
          .reduce((acc, curr) => acc + curr.amount, 0),
      }));
      console.log(investmentData);
      setInvestmentData(investmentData);
    } catch (e) {
      failure("Failed to load investments by category");
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchGoals();
    fetchInvestments();
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    fetchInvestmentsbyCategory();
  }, [investments]);
  // Data processing for charts
  const categoryData = expenseData.reduce((acc, expense) => {
    const existingCategory = acc.find((item) => item.name === expense.category);
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  const histogramData = expenseData
    .filter(
      (expense) =>
        selectedMonth === "All" ||
        new Date(expense.date).toLocaleString("default", { month: "long" }) ===
          selectedMonth
    )
    .reduce((acc, expense) => {
      const dateKey =
        selectedMonth === "All"
          ? new Date(expense.date).toLocaleString("default", { month: "short" })
          : new Date(expense.date).getDate();
      const existingDate = acc.find((item) => item.name === dateKey);
      if (existingDate) {
        existingDate.amount += expense.amount;
      } else {
        acc.push({ name: dateKey, amount: expense.amount });
      }
      return acc;
    }, []);

  return (
    <div className="bg-primary-color flex-1 h-screen p-5 md:p-10 overflow-y-scroll vscrollbar">
      <div className="w-full flex items-center justify-between space-x-4 max-w-full overflow-x-scroll md:overflow-hidden">
        {/* Year Dropdown */}
        <div>
          <label className="text-white mr-2">Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-secondary-color p-2 rounded-md text-white"
          >
            {Array.from({ length: 31 }, (_, i) => (2010 + i).toString()).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
        </div>

        {/* Month Dropdown */}
        <div>
          <label className="text-white mr-2">Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-secondary-color p-2 rounded-md text-white"
          >
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pie Chart for Expenses by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-secondary-color p-4 rounded-md">
          <h3 className="text-white mb-4">Expenses by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Histogram for Expenses by Date */}
        <div className="bg-secondary-color p-4 rounded-md">
          <h3 className="text-white mb-4">Expenses Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={histogramData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Pie chart for Investments by Type */}
        <div className="bg-secondary-color p-4 rounded-md">
          <h3 className="text-white mb-4">Investments by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={investmentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {investmentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Recent Expenses */}
        <div className="bg-secondary-color p-6 rounded-lg shadow-lg space-y-4">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Recent Expenses
          </h3>
          <ul className="text-white space-y-3">
            {expenseData.slice(0, 5).map((expense, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-gray-700 py-2"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{expense.category}</span>
                  <span className="text-sm text-gray-400">
                    {new Date(expense.date).toLocaleDateString()}
                  </span>
                </div>
                <span className="font-semibold text-xl">${expense.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Investments */}
        <div className="bg-secondary-color p-6 rounded-lg shadow-lg space-y-4">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Investments
          </h3>
          <ul className="text-white space-y-3">
            {investments.slice(0, 5).map((investment, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-gray-700 py-2"
              >
                <div className="flex flex-col">
                  <span className="font-medium">
                    {investment.investmentType}
                  </span>
                </div>
                <span className="font-semibold text-xl">
                  ${investment.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Goals */}
        <div className="bg-secondary-color p-6 rounded-lg shadow-lg space-y-4">
          <h3 className="text-2xl font-semibold text-white mb-4">Goals</h3>
          <ul className="text-white space-y-3">
            {goals.slice(0, 5).map((goal, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b border-gray-700 py-2"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{goal.goalName}</span>
                  <span className="text-sm text-gray-400">
                    Due by {formatDate(goal.deadline)}
                  </span>
                </div>
                <span className="font-semibold text-xl">{goal.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
