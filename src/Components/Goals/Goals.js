import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddGoal from "./AddGoal";
import { deleteGoal, getGoals } from "../../api/Finances/Goals";
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";
import { formatDate } from "../../Utils/Helper";
import EditGoal from "./EditGoal";

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
      const resp = await getGoals();
      setGoals(resp);
    } catch (e) {
      failure("Failed to load goals");
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [isModalOpen, isEditOpen]);

  const deleteGoalHandler = async (goalId) => {
    const updatedGoals = goals.filter((goal) => goal._id !== goalId);
    setGoals(updatedGoals);

    try {
      setLoading(true);
      setError(null);
      await deleteGoal(goalId);
      success("Goal deleted successfully");
    } catch (err) {
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

  const calculateProgress = (currentAmount, targetAmount) => {
    return targetAmount > 0
      ? Math.min((currentAmount / targetAmount) * 100, 100)
      : 0;
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
              <th className="p-4">Goal</th>
              <th className="p-4">Deadline</th>
              <th className="p-4">Invested</th>
              <th className="p-4">Target Amount</th>
              <th className="p-4">Progress</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal, index) => {
              const progress = calculateProgress(
                goal.currentAmount,
                goal.targetAmount
              );
              return (
                <tr
                  key={index}
                  className="hover:bg-gray-700 transition-colors duration-200"
                >
                  <td className="p-4">{goal.goalName}</td>
                  <td className="p-4">{formatDate(goal.deadline)}</td>
                  <td className="p-4">{goal.currentAmount}</td>
                  <td className="p-4">{goal.targetAmount}</td>
                  <td className="p-2 ">
                    {/* Progress Bar */}
                    <div className="flex items-center space-x-2">
                      <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="absolute h-full bg-yellow-500 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-yellow-500 font-bold">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </td>
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
              );
            })}
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
