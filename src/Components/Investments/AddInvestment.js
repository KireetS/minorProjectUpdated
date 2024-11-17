import React, { useContext, useState, useEffect } from "react";
import { createInvestment } from "../../api/Finances/Investments"; // Ensure you have an API call to create an investment

import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";
import { getUser } from "../../api/Auth/AuthAPI";

const AddInvestment = ({ isOpen, onClose }) => {
  const { success, failure } = useContext(ToastifyContext);
  const [investmentDetails, setInvestmentDetails] = useState({
    amount: "",
    date: "",
    roi: "",
    duration: "",
    investmentType: "", // Type of investment
    description: "", // Optional description
  });
  const [investmentTypes, setInvestmentTypes] = useState([]);

  // Fetch investment types when the modal is opened
  useEffect(() => {
    if (isOpen) {
      const fetchTypes = async () => {
        try {
          const types = await getUser(); // Assuming this fetches the available investment types from the API

          setInvestmentTypes(types.investmentTypes);
        } catch (err) {
          failure(`Error fetching investment types: ${err.message}`);
        }
      };
      fetchTypes();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestmentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the date is formatted correctly
      const formattedInvestmentDetails = {
        ...investmentDetails,
        date: new Date(investmentDetails.date).toISOString(), // Convert to ISO format if needed
      };

      await createInvestment(formattedInvestmentDetails); // Send the investmentDetails with the correct field names
      success("Investment added successfully");
      onClose();
    } catch (err) {
      failure(`Error adding investment: ${err.message}`); // Include error message for better debugging
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-secondary-color w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative animate-scale-up">
        <h2 className="text-white text-2xl font-semibold mb-4">
          Add New Investment
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block mb-2">Amount</label>
            <input
              type="number"
              name="amount" // Amount invested
              value={investmentDetails.amount}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Duration (In Years)</label>
            <input
              type="number"
              name="duration" // Amount invested
              value={investmentDetails.duration}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">
              Expected Rate of Interest
            </label>
            <input
              type="number"
              name="roi" // Amount invested
              value={investmentDetails.roi}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Date</label>
            <input
              type="date"
              name="date" // Date of investment
              value={investmentDetails.date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Investment Type</label>
            <select
              name="investmentType"
              value={investmentDetails.investmentType}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="">Select an Investment Type</option>
              {investmentTypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Description</label>
            <textarea
              name="description" // Optional description
              value={investmentDetails.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
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
              Add Investment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvestment;
