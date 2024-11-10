import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddExpense from "./AddExpense";
import AddCategoryModal from "./AddCategoryModal";
import {
  deleteExpense,
  getCategories,
  getExpenses,
} from "../../api/Finances/Expenses";
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";
import { formatDate } from "../../Utils/Helper";
import EditExpense from "./EditExpense";
const Expenses = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCModalOpen, setIsCModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const { success, failure } = useContext(ToastifyContext);
  const years = Array.from({ length: 31 }, (_, i) => (2010 + i).toString());
  const months = [
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
  const [categories, setCategories] = useState([]);

  const [expenses, setExpenses] = useState([]);
  const handleModalClose = () => {
    setIsCModalOpen(false);
  };

  const handleAddCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory.name]);
    setSelectedCategory(newCategory.name); // Automatically select the new category
  };

  const fetchExpenses = async () => {
    try {
      const resp = await getExpenses(
        months.indexOf(selectedMonth) + 1,
        selectedYear,
        selectedCategory
      );
      const x = await getCategories();
      setCategories(x.data);
      setExpenses(resp);
    } catch (e) {
      failure("failure in loading expenses");
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, [
    selectedMonth,
    selectedYear,
    selectedCategory,
    isCModalOpen,
    isModalOpen,
    isEditOpen,
  ]);

  const sumExpenses = () => {
    let sum = 0;

    // Calculation the sum using forEach
    expenses.forEach((x) => {
      sum += x.amount;
    });
    return sum;
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteExpensehere = async (expenseId) => {
    // Optimistically remove the expense from the local state
    const updatedExpenses = expenses.filter(
      (expense) => expense._id !== expenseId
    );
    setExpenses(updatedExpenses);

    try {
      setLoading(true);
      setError(null);

      await deleteExpense(expenseId);

      // Show success notification
      success("Expense deleted successfully");
    } catch (err) {
      // If there's an error, revert the optimistic update
      setExpenses(expenses);
      setError(err.response?.data?.error || "Failed to delete expense");

      // Show error notification
      failure("Error deleting expense");
    } finally {
      setLoading(false);
    }
  };

  const handleEditExpense = (id) => {
    setSelectedExpenseId(id); // Set the selected expense ID
    setIsEditOpen(true); // Open the edit modal
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false); // Close the edit modal
    setSelectedExpenseId(null); // Reset the selected expense ID
  };
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
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
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

        {/* Category Dropdown */}
        <div>
          <label className="text-white mr-2">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-secondary-color p-2 rounded-md text-white"
          >
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="w-full flex items-center justify-end space-x-4 py-3 px-0">
        {/* <button
          onClick={() => {
            setIsCModalOpen(true);
          }}
          className="bg-yellow-500 text-white font-bold rounded-lg py-2 px-3"
        >
          Add Category
        </button> */}
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white font-bold rounded-lg py-2 px-3"
        >
          Add Expense
        </button>
      </div>

      <div className="mt-6 overflow-x-scroll rounded-lg shadow-md max-w-full vscrollbar lg:overflow-hidden">
        {/* Expenses Table */}
        <table className="w-full text-white border-separate border-spacing-0 bg-secondary-color rounded-lg">
          <thead>
            <tr className="bg-secondary-color text-left rounded-t-lg">
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Category</th>
              <th className="p-4">Description</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="p-4">{formatDate(expense.date)}</td>
                <td className="p-4">{expense.amount}</td>
                <td className="p-4">{expense.category}</td>
                <td className="p-4">{expense.description}</td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedExpenseId(expense._id);
                      setIsEditOpen(true);
                      console.log(selectedExpenseId);
                    }}
                    className="bg-[#1a73e8] p-2 rounded"
                  >
                    <FaEdit style={{ fontSize: "1rem" }} />
                  </button>
                  <button
                    onClick={() => {
                      deleteExpensehere(expense._id);
                    }}
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
      <div className="mt-8  text-white text-lg font-semibold">
        Total Cost for {selectedMonth} {selectedYear}:{" "}
        <span className="text-red-500"> ${sumExpenses()}</span>
      </div>
      <AddExpense isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AddCategoryModal
        isOpen={isCModalOpen}
        onClose={handleModalClose}
        onAddCategory={handleAddCategory}
      />
      <EditExpense
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        expenseId={selectedExpenseId}
      />
    </div>
  );
};

export default Expenses;
