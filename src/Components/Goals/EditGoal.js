import React, { useEffect, useState, useContext } from "react";
import { getGoalById, updateGoal } from "../../api/Finances/Goals"; // Ensure you have the necessary API calls
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";

const EditGoal = ({ isOpen, onClose, goalId }) => {
  const { success, failure } = useContext(ToastifyContext);
  const [goalDetails, setGoalDetails] = useState({
    goalName: "",
    description: "",
    currentAmount: "",
    targetAmount: "",
    deadline: "",
  });

  const fetchGoalDetails = async (id) => {
    try {
      const goalData = await getGoalById(id); // Fetch the goal by ID

      // Convert ISO date string to YYYY-MM-DD format
      const formatDate = (isoDate) => {
        if (!isoDate) return "";
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
      };

      const formattedGoalData = {
        ...goalData,
        deadline: formatDate(goalData.deadline), // Format the deadline
      };

      setGoalDetails(formattedGoalData);
    } catch (error) {
      failure("Error fetching goal details");
    }
  };

  useEffect(() => {
    if (goalId) {
      fetchGoalDetails(goalId);
    }
  }, [goalId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateGoal(goalId, goalDetails); // Call the update API
      success("Goal updated successfully");
      onClose();
    } catch (err) {
      failure("Error updating goal");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-secondary-color w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative animate-scale-up">
        <h2 className="text-white text-2xl font-semibold mb-4">Edit Goal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block mb-2">Goal Name</label>
            <input
              type="text"
              name="goalName"
              value={goalDetails.goalName}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Description</label>
            <textarea
              name="description"
              value={goalDetails.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Invested Amount</label>
            <input
              type="number"
              name="currentAmount"
              value={goalDetails.currentAmount}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Target Amount</label>
            <input
              type="number"
              name="targetAmount"
              value={goalDetails.targetAmount}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Target Date</label>
            <input
              type="date"
              name="deadline"
              value={goalDetails.deadline}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-400 transition"
            >
              Update Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGoal;
