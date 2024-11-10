import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddGoal from "./AddGoal"; // Import your AddGoal component
import { deleteGoal, getGoals } from "../../api/Finances/Goals"; // Replace with your actual API file for goals
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";
import { formatDate } from "../../Utils/Helper";
import EditGoal from "./EditGoal"; // Import your EditGoal component

const Goals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const { success, failure } = useContext(ToastifyContext);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGoals = async () => {
    try {
      const resp = await getGoals(); // Fetch goals from your API
      setGoals(resp);
    } catch (e) {
      failure("Failed to load goals");
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [isModalOpen, isEditOpen]);

  const deleteGoalHandler = async (goalId) => {
    // Optimistically remove the goal from the local state
    const updatedGoals = goals.filter((goal) => goal._id !== goalId);
    setGoals(updatedGoals);

    try {
      setLoading(true);
      setError(null);
      await deleteGoal(goalId); // Call the delete API

      // Show success notification
      success("Goal deleted successfully");
    } catch (err) {
      // If there's an error, revert the optimistic update
      setGoals(goals);
      setError(err.response?.data?.error || "Failed to delete goal");
      failure("Error deleting goal");
    } finally {
      setLoading(false);
    }
  };

  const handleEditGoal = (id) => {
    setSelectedGoalId(id);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedGoalId(null);
  };

  return (
    <div className="bg-primary-color flex-1 h-screen p-5 md:p-10 overflow-y-scroll vscrollbar">
      <div className="w-full flex items-center justify-end space-x-4 py-3 px-0">
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white font-bold rounded-lg py-2 px-3"
        >
          Add Goal
        </button>
      </div>

      <div className="mt-6 overflow-x-scroll rounded-lg shadow-md max-w-full vscrollbar lg:overflow-hidden">
        {/* Goals Table */}
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
            {goals.map((goal, index) => (
              <tr
                key={index}
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
                    onClick={() => handleEditGoal(goal._id)}
                    className="bg-[#1a73e8] p-2 rounded"
                  >
                    <FaEdit style={{ fontSize: "1rem" }} />
                  </button>
                  <button
                    onClick={() => deleteGoalHandler(goal._id)}
                    className="bg-red-500 p-2 ml-2 rounded"
                  >
                    <MdDelete style={{ fontSize: "1rem" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddGoal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditGoal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        goalId={selectedGoalId}
      />
    </div>
  );
};

export default Goals;
