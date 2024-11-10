import axios from "axios";

const url = process.env.REACT_APP_BURL;

// Function to add a new expense
export const addExpense = async (expenseData) => {
  try {
    const response = await axios.post(`${url}/api/expenses`, expenseData, {
      headers: {
        "Content-Type": "application/json",
        "authToken": `${localStorage.getItem("authToken")}`, // Assuming you store the token in local storage
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};

// Function to get all expenses or filtered expenses by month and year
export const getExpenses = async (month, year, category) => {
  try {
    const response = await axios.get(`${url}/api/expenses`, {
      params: { month, year, category },
      headers: {
        "authToken": localStorage.getItem("authToken"), // Assumes the token is in local storage
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};
export const getExpensewithID = async (id) => {
  try {
    const response = await axios.get(`${url}/api/expenses/${id}`, {
      headers: {
        "authToken": localStorage.getItem("authToken"), // Assumes the token is in local storage
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
  }
};

// Function to update an expense by id
export const updateExpense = async (id, expenseData) => {
  try {
    const response = await axios.put(`${url}/api/expenses/${id}`, expenseData, {
      headers: {
        "Content-Type": "application/json",
        "authToken": `${localStorage.getItem("authToken")}`, // Assuming you store the token in local storage
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
};

// Function to delete an expense by id
export const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${url}/api/expenses/${id}`, {
      headers: {
        "authToken": `${localStorage.getItem("authToken")}`, // Assuming you store the token in local storage
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
};

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust your base URL accordingly
  headers: {
    "authToken": localStorage.getItem("authToken"), // Or however you manage your token
  },
});
export const createCategory = async (name) => {
  try {
    const response = await axiosInstance.post("/expenses/category", { name });
    console.log("Category created:", response.data);
  } catch (error) {
    console.error("Error creating category:", error.response.data);
  }
};
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/expenses/category"); // Adjust this route to fetch categories if you have a specific endpoint
    console.log("Categories:", response.data.expenseCategories);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error.response.data);
  }
};
