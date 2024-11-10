import React, { useEffect, useState, useContext } from "react";
import {
  getExpenseById,
  getExpensewithID,
  updateExpense,
} from "../../api/Finances/Expenses"; // Adjust the import path as necessary
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";

const EditExpense = ({ isOpen, onClose, expenseId }) => {
  const [expenseDetails, setExpenseDetails] = useState({
    date: "",
    amount: "",
    category: "",
    description: "",
    paymentMethod: "",
  });
  const { success, failure } = useContext(ToastifyContext);

  useEffect(() => {
    const fetchExpense = async () => {
      if (expenseId) {
        try {
          const expense = await getExpensewithID(expenseId);
          // Format the date to yyyy-MM-dd
          const formattedDate = new Date(expense.date)
            .toISOString()
            .split("T")[0];
          setExpenseDetails({
            date: formattedDate,
            amount: expense.amount,
            category: expense.category,
            description: expense.description,
            paymentMethod: expense.paymentMethod,
          });
        } catch (error) {
          failure("Failed to fetch expense");
        }
      }
    };

    fetchExpense();
  }, [expenseId, failure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExpense(expenseId, expenseDetails); // Call the API to update the expense
      success("Expense updated successfully");
      onClose(); // Close the modal
    } catch (error) {
      failure("Failed to update expense");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-secondary-color w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative animate-scale-up">
        <h2 className="text-white text-2xl font-semibold mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-white block mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={expenseDetails.date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Amount</label>
            <input
              type="number"
              name="amount"
              value={expenseDetails.amount}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Category</label>
            <select
              name="category"
              value={expenseDetails.category}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="">Select a category</option>
              <option value="Groceries">Groceries</option>
              <option value="Utilities">Utilities</option>
              <option value="Rent">Rent</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="text-white block mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={expenseDetails.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="text-white block mb-2">Payment Method</label>
            <select
              name="paymentMethod"
              value={expenseDetails.paymentMethod}
              onChange={handleChange}
              className="w-full p-2 rounded bg-primary-color text-white border-none focus:ring-2 focus:ring-yellow-500"
              required
            >
              <option value="">Select a payment method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
            </select>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;
