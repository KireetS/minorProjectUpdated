import React, { useEffect, useState, useContext } from "react";
import {
  getInvestmentById,
  updateInvestment,
} from "../../api/Finances/Investments"; // Ensure you have the necessary API calls
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";

const EditInvestment = ({ isOpen, onClose, investmentId }) => {
  const { success, failure } = useContext(ToastifyContext);
  const [investmentDetails, setInvestmentDetails] = useState({
    investmentName: "",
    description: "",
    investedAmount: "",
    targetAmount: "",
    targetDate: "",
  });

  const fetchInvestmentDetails = async (id) => {
    try {
      const investmentData = await getInvestmentById(id); // Fetch the investment by ID

      // Convert ISO date string to YYYY-MM-DD format
      const formatDate = (isoDate) => {
        if (!isoDate) return "";
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
      };

      const formattedInvestmentData = {
        ...investmentData,
        targetDate: formatDate(investmentData.targetDate), // Format the targetDate
      };

      setInvestmentDetails(formattedInvestmentData);
    } catch (error) {
      failure("Error fetching investment details");
    }
  };

  useEffect(() => {
    if (investmentId) {
      fetchInvestmentDetails(investmentId);
    }
  }, [investmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestmentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateInvestment(investmentId, investmentDetails); // Call the update API
      success("Investment updated successfully");
      onClose();
    } catch (err) {
      failure("Error updating investment");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-secondary-color w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative animate-scale-up">
        <h2 className="text-white text-2xl font-semibold mb-4">
          Edit Investment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block mb-2">Investment Name</label>
            <input
              type="text"
              name="investmentName"
              value={investmentDetails.investmentName}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Description</label>
            <textarea
              name="description"
              value={investmentDetails.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Invested Amount</label>
            <input
              type="number"
              name="investedAmount"
              value={investmentDetails.investedAmount}
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
              value={investmentDetails.targetAmount}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Target Date</label>
            <input
              type="date"
              name="targetDate"
              value={investmentDetails.targetDate}
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
              Update Investment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInvestment;
