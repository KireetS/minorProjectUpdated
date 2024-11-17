import React, { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddInvestment from "./AddInvestment"; // Import your AddInvestment component
import {
  deleteInvestment,
  getInvestments,
  getTotalInvestments,
} from "../../api/Finances/Investments"; // Replace with your actual API file for investments
import ToastifyContext from "../../Contexts/toastifyContext/ToastifyContext";
import { formatDate } from "../../Utils/Helper";
import EditInvestment from "./EditInvestment"; // Import your EditInvestment component
import AddInvestmentTypes from "./AddInvestmentTypes";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getUser } from "../../api/Auth/AuthAPI";
const Investments = () => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTModalOpen, setIsTModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedInvestmentId, setSelectedInvestmentId] = useState(null);
  const { success, failure } = useContext(ToastifyContext);
  const [investments, setInvestments] = useState([]);
  const [investmentData, setInvestmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState({});
  const getTotal = () => {
    let totalAmount = 0;
    let totalReturn = 0;
    investments.forEach((element) => {
      totalAmount += Number(element.amount);
      totalReturn += Number(element.expAmount);
    });
    totalAmount = totalAmount.toFixed(2);
    totalReturn = totalReturn.toFixed(2);
    setTotal({ totalAmount, totalReturn });
  };
  const fetchInvestments = async () => {
    try {
      const resp = await getInvestments(); // Fetch investments from your API
      setInvestments(resp);
    } catch (e) {
      failure("Failed to load investments");
    }
  };
  const fetchTotalInvestments = async () => {
    try {
      const resp = await getTotalInvestments(); // Fetch investments from your API

      console.log("this is total", resp);
    } catch (e) {
      failure("Failed to load investments");
    }
  };
  const fetchInvestmentsbyCategory = async () => {
    try {
      const user = await getUser(); // Fetch the user data to get investment types
      const investmentTypes = user.investmentTypes;

      // Fetch all investments
      const investments = await getInvestments();

      // Aggregate investments by type
      const investmentData = investmentTypes.map((type) => ({
        name: type.name,
        value: investments
          .filter((investment) => investment.investmentType === type.name)
          .reduce((acc, curr) => acc + curr.amount, 0),
      }));

      setInvestmentData(investmentData);
    } catch (e) {
      failure("Failed to load investments by category");
    }
  };
  useEffect(() => {
    fetchInvestments();
    fetchTotalInvestments();
    fetchInvestmentsbyCategory();
  }, [isModalOpen, isEditOpen]);
  useEffect(() => {
    getTotal();
    console.log(total);
  }, [investments]);

  const deleteInvestmentHandler = async (investmentId) => {
    // Optimistically remove the investment from the local state
    const updatedInvestments = investments.filter(
      (investment) => investment._id !== investmentId
    );
    setInvestments(updatedInvestments);

    try {
      setLoading(true);
      setError(null);
      await deleteInvestment(investmentId); // Call the delete API

      // Show success notification
      success("Investment deleted successfully");
    } catch (err) {
      // If there's an error, revert the optimistic update
      setInvestments(investments);
      setError(err.response?.data?.error || "Failed to delete investment");
      failure("Error deleting investment");
    } finally {
      setLoading(false);
    }
  };

  const handleEditInvestment = (id) => {
    setSelectedInvestmentId(id);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setSelectedInvestmentId(null);
  };

  return (
    <div className="bg-primary-color flex-1 h-screen p-5 md:p-10 overflow-y-scroll vscrollbar">
      <div className="w-full flex items-center justify-end space-x-4 py-3 px-0">
        <button
          onClick={() => {
            setIsTModalOpen(true);
          }}
          className="bg-yellow-500 text-white font-bold rounded-lg py-2 px-3"
        >
          Add Investment Type
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white font-bold rounded-lg py-2 px-3"
        >
          Add Investment
        </button>
      </div>
      <div className="bg-secondary-color p-4 rounded-md">
        <h3 className="text-white mb-4">Investments by Type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={investmentData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name }) => name}
            >
              {investmentData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full flex items-center justify-end space-x-4 text-white text-lg  py-3 px-0">
        Total Amount Invested : ${total.totalAmount} <br />
        Total Expected Returns : ${total.totalReturn}
      </div>

      <div className="mt-6 overflow-x-scroll rounded-lg shadow-md max-w-full vscrollbar lg:overflow-hidden">
        {/* Investments Table */}
        <table className="w-full text-white border-separate border-spacing-0 bg-secondary-color rounded-lg">
          <thead>
            <tr className="bg-secondary-color text-left rounded-t-lg">
              <th className="p-4">Date</th>
              <th className="p-4">Investment Type</th>
              <th className="p-4">Description</th>
              <th className="p-4">Amount Invested</th>
              <th className="p-4">Expected ROI</th>
              <th className="p-4">Duration (in years)</th>
              <th className="p-4">Returns</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {investments.map((investment, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700 transition-colors duration-200"
              >
                <td className="p-4">{formatDate(investment.date)}</td>
                <td className="p-4">{investment.investmentType}</td>
                <td className="p-4">{investment.description}</td>
                <td className="p-4">{investment.amount}</td>
                <td className="p-4">{investment.roi}</td>
                <td className="p-4">{investment.duration}</td>
                <td className="p-4">
                  {Number(investment.expAmount).toFixed()}
                </td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => handleEditInvestment(investment._id)}
                    className="bg-[#1a73e8] p-2 rounded"
                  >
                    <FaEdit style={{ fontSize: "1rem" }} />
                  </button>
                  <button
                    onClick={() => deleteInvestmentHandler(investment._id)}
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

      <AddInvestment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <AddInvestmentTypes
        isOpen={isTModalOpen}
        onClose={() => setIsTModalOpen(false)}
      />
      <EditInvestment
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        investmentId={selectedInvestmentId}
      />
    </div>
  );
};

export default Investments;
