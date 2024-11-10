import React, { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { deleteGoal, getGoals } from "../../api/Finances/Goals"; // Import your API functions
import { getExpenses } from "../../api/Finances/Expenses"; // Import expenses API
import { getInvestments } from "../../api/Finances/Investments"; // Import investments API
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";
import { formatDate } from "../../Utils/Helper";

const Dashboard = () => {
  const { success, failure } = useContext(ToastifyContext);
  const [goals, setGoals] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all data for the dashboard
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const goalsData = await getGoals();
      const expensesData = await getExpenses();
      const investmentsData = await getInvestments();

      setGoals(goalsData);
      setExpenses(expensesData);
      setInvestments(investmentsData);
    } catch (e) {
      failure("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteGoalHandler = async (goalId) => {
    // Optimistically remove the goal from the local state
    const updatedGoals = goals.filter((goal) => goal._id !== goalId);
    setGoals(updatedGoals);

    try {
      setLoading(true);
      await deleteGoal(goalId); // Call the delete API
      success("Goal deleted successfully");
    } catch (err) {
      setGoals(goals); // Revert the optimistic update
      failure("Error deleting goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary-color flex-1 h-screen p-5 md:p-10 overflow-y-scroll vscrollbar">
      <h1 className="text-2xl font-bold text-white mb-4">Dashboard</h1>

      {loading ? (
        <p className="text-white">No data to show</p>
      ) : (
        <>
          {/* Goals Section */}
          <div className="mt-6 overflow-x-scroll rounded-lg shadow-md max-w-full vscrollbar lg:overflow-hidden">
            <h2 className="text-xl font-semibold text-white mb-3">Goals</h2>
            <table className="w-full text-white border-separate border-spacing-0 bg-secondary-color rounded-lg">
              <thead>
                <tr className="bg-secondary-color text-left rounded-t-lg">
                  <th className="p-4">Date</th>
                  <th className="p-4">Goal</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Invested Amount</th>
                  <th className="p-4">Target Amount</th>
                  <th className="p-4">Target Date</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {goals.map((goal) => (
                  <tr
                    key={goal._id}
                    className="hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="p-4">{formatDate(goal.createdAt)}</td>
                    <td className="p-4">{goal.goalName}</td>
                    <td className="p-4">{goal.description}</td>
                    <td className="p-4">{goal.currentAmount}</td>
                    <td className="p-4">{goal.targetAmount}</td>
                    <td className="p-4">{formatDate(goal.deadline)}</td>
                    <td className="p-4 flex space-x-2">
                      <button
                        onClick={() => deleteGoalHandler(goal._id)}
                        className="bg-red-500 p-2 rounded"
                      >
                        <MdDelete style={{ fontSize: "1rem" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Expenses Section */}
          <div className="mt-6 overflow-x-scroll rounded-lg shadow-md max-w-full vscrollbar lg:overflow-hidden">
            <h2 className="text-xl font-semibold text-white mb-3">Expenses</h2>
            <table className="w-full text-white border-separate border-spacing-0 bg-secondary-color rounded-lg">
              <thead>
                <tr className="bg-secondary-color text-left rounded-t-lg">
                  <th className="p-4">Date</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Description</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense._id}
                    className="hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="p-4">{formatDate(expense.date)}</td>
                    <td className="p-4">{expense.category}</td>
                    <td className="p-4">{expense.amount}</td>
                    <td className="p-4">{expense.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Investments Section */}
          <div className="mt-6 overflow-x-scroll rounded-lg shadow-md max-w-full vscrollbar lg:overflow-hidden">
            <h2 className="text-xl font-semibold text-white mb-3">
              Investments
            </h2>
            <table className="w-full text-white border-separate border-spacing-0 bg-secondary-color rounded-lg">
              <thead>
                <tr className="bg-secondary-color text-left rounded-t-lg">
                  <th className="p-4">Date</th>
                  <th className="p-4">Investment Type</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Description</th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment) => (
                  <tr
                    key={investment._id}
                    className="hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="p-4">{formatDate(investment.date)}</td>
                    <td className="p-4">{investment.investmentType}</td>
                    <td className="p-4">{investment.amount}</td>
                    <td className="p-4">{investment.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
