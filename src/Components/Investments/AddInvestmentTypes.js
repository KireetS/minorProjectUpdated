import React, { useState, useContext } from "react";
import { createInvestmentType } from "../../api/Finances/Investments"; // Ensure you have an API function to create an investment type
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";

const AddInvestmentTypes = ({ isOpen, onClose }) => {
  const { success, failure } = useContext(ToastifyContext);
  const [investmentType, setInvestmentType] = useState(""); // State for the investment type name

  const handleChange = (e) => {
    setInvestmentType(e.target.value); // Update the investment type name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!investmentType.trim()) {
      failure("Please provide an investment type name.");
      return;
    }

    try {
      // Send the new investment type to the backend
      console.log(investmentType);
      await createInvestmentType({ investmentType });
      success(`Investment type added successfully : ${investmentType}`);
      // setInvestmentType(""); // Clear input after success
      onClose(); // Close the modal after submission
    } catch (err) {
      failure(`Error adding investment type: ${err.message}`);
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-secondary-color w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative animate-scale-up">
        <h2 className="text-white text-2xl font-semibold mb-4">
          Add Investment Type
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block mb-2">
              Investment Type Name
            </label>
            <input
              type="text"
              name="investmentType" // Name for the new investment type
              value={investmentType}
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
              Add Investment Type
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvestmentTypes;
