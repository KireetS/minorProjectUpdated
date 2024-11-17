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
import { Link } from "react-router-dom";
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
                label={({ name }) => name}
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
                label={({ name }) => name}
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

        {/* inside this div , create a recent goals container , where there's a see all button on top right , which will redirect to /goals , make the recent goals similar to goals component right now meaning , goal name and progress bar (with the percentage of course)only . make it stylish and chic , make it good to look at  */}
        <div className="bg-secondary-color p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white text-xl font-semibold">Recent Goals</h3>
            <Link to="/goals" className="text-blue-400 hover:underline text-sm">
              See All
            </Link>
          </div>
          <div className="space-y-6">
            {goals.slice(0, 3).map((goal) => {
              const progressPercentage =
                (goal.currentAmount / goal.targetAmount) * 100;

              return (
                <div
                  key={goal.id}
                  className="p-4 bg-primary-color rounded-lg shadow-md"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-white text-lg font-medium">
                      {goal.goalName}
                    </h4>
                    <span className="text-white text-sm font-semibold">
                      {Math.min(progressPercentage, 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div
                        className="h-2 rounded-full bg-yellow-500"
                        style={{
                          width: `${Math.min(progressPercentage, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
