import axios from "axios";

// Set up the base URL for your API
const API_URL = process.env.REACT_APP_BURL + "/api/goals"; // Assuming you have the base URL in your .env file

// Function to get authToken from local storage
const getAuthToken = () => localStorage.getItem("authToken");

// Create a new goal
export const createGoal = async (goalData) => {
  try {
    const response = await axios.post(API_URL, goalData, {
      headers: {
        "authToken": getAuthToken(), // Include the auth token in the headers
      },
    });
    return response.data; // Return the created goal data
  } catch (error) {
    console.error("Error creating goal:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Get all goals for the authenticated user
export const getGoals = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "authToken": getAuthToken(), // Include the auth token in the headers
      },
    });
    return response.data; // Return the list of goals
  } catch (error) {
    console.error("Error fetching goals:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Get a specific goal by ID
export const getGoalById = async (goalId) => {
  try {
    const response = await axios.get(`${API_URL}/${goalId}`, {
      headers: {
        "authToken": getAuthToken(), // Include the auth token in the headers
      },
    });
    return response.data; // Return the goal data
  } catch (error) {
    console.error("Error fetching goal:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Update a specific goal by ID
export const updateGoal = async (goalId, goalData) => {
  try {
    const response = await axios.put(`${API_URL}/${goalId}`, goalData, {
      headers: {
        "authToken": getAuthToken(), // Include the auth token in the headers
      },
    });
    return response.data; // Return the updated goal data
  } catch (error) {
    console.error("Error updating goal:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Delete a specific goal by ID
export const deleteGoal = async (goalId) => {
  try {
    const response = await axios.delete(`${API_URL}/${goalId}`, {
      headers: {
        "authToken": getAuthToken(), // Include the auth token in the headers
      },
    });
    return response.data; // Return the success message
  } catch (error) {
    console.error("Error deleting goal:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
