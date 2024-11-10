import React, { useContext, useState } from "react";
import { createGoal } from "../../api/Finances/Goals"; // Ensure you have an API call to create a goal
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";

const AddGoal = ({ isOpen, onClose }) => {
  const { success, failure } = useContext(ToastifyContext);
  const [goalDetails, setGoalDetails] = useState({
    goalName: "", // Changed from title to goalName
    description: "",
    currentAmount: "", // Renamed back to currentAmount
    targetAmount: "",
    deadline: "", // Changed back to deadline
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGoalDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the deadline is formatted correctly
      const formattedGoalDetails = {
        ...goalDetails,
        deadline: new Date(goalDetails.deadline).toISOString(), // Convert to ISO format if needed
      };

      await createGoal(formattedGoalDetails); // Send the goalDetails with the correct field names
      success("Goal added successfully");
      onClose();
    } catch (err) {
      failure(`Error adding goal: ${err.message}`); // Include error message for better debugging
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-secondary-color w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative animate-scale-up">
        <h2 className="text-white text-2xl font-semibold mb-4">Add New Goal</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block mb-2">Goal Name</label>
            <input
              type="text"
              name="goalName" // Updated name attribute
              value={goalDetails.goalName} // Updated value
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
            <label className="text-white block mb-2">Current Amount</label>
            <input
              type="number"
              name="currentAmount" // Changed back to currentAmount
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
              name="targetAmount" // Ensure this matches the state variable
              value={goalDetails.targetAmount}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Deadline</label>
            <input
              type="date"
              name="deadline" // Changed back to deadline
              value={goalDetails.deadline} // Ensure this uses deadline from state
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
              className="py-2 px-4 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            >
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoal;
