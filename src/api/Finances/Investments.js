import axios from "axios";

// Set up the base URL for your API
const API_URL = process.env.REACT_APP_BURL + "/api/investments"; // Assuming you have the base URL in your .env file

// Function to get authToken from local storage
const getAuthToken = () => localStorage.getItem("auth-token");

// Create a new investment
export const createInvestment = async (investmentData) => {
  try {
    const response = await axios.post(API_URL, investmentData, {
      headers: {
        "auth-token": getAuthToken(), // Include the auth token in the headers
      },
    });
    return response.data; // Return the created investment data
  } catch (error) {
    console.error("Error creating investment:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Get all investments for the authenticated user
export const getInvestments = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        "auth-token": getAuthToken(), // Include the auth token in the headers
      },
    });
    return response.data; // Return the list of investments
  } catch (error) {
    console.error("Error fetching investments:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
export const getTotalInvestments = async () => {
  try {
    const response = await axios.get(`${API_URL}/total-investment`, {
      headers: {
        "auth-token": getAuthToken(), // Include the auth token in the headers
      },
    });
    return response.data; // Return the list of investments
  } catch (error) {
    console.error("Error fetching investments:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Get a specific investment by ID
export const getInvestmentById = async (investmentId) => {
  try {
    const response = await axios.get(`${API_URL}/${investmentId}`, {
      headers: {
        "auth-token": getAuthToken(), // Include the auth token in the headers
      },
    });
    return response.data; // Return the investment data
  } catch (error) {
    console.error("Error fetching investment:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Update a specific investment by ID
export const updateInvestment = async (investmentId, investmentData) => {
  try {
    const response = await axios.put(
      `${API_URL}/${investmentId}`,
      investmentData,
      {
        headers: {
          "auth-token": getAuthToken(), // Include the auth token in the headers
        },
      }
    );
    return response.data; // Return the updated investment data
  } catch (error) {
    console.error("Error updating investment:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

// Delete a specific investment by ID
export const deleteInvestment = async (investmentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${investmentId}`, {
      headers: {
        "auth-token": getAuthToken(), // Include the auth token in the headers
      },
    });
    return response.data; // Return the success message
  } catch (error) {
    console.error("Error deleting investment:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const createInvestmentType = async (investmentTypeData) => {
  try {
    const response = await axios.post(
      `${API_URL}/investment-types`,
      investmentTypeData,
      {
        headers: {
          "auth-token": getAuthToken(), // Include the auth token in the headers for authentication
        },
      }
    );

    return response.data; // Return the newly created investment type data from the response
  } catch (error) {
    console.error("Error creating investment type:", error);
    throw error; // Rethrow the error so it can be handled in the component
  }
};
export const fetchInvestmentsByType = async (investmentType) => {
  try {
    const response = await axios.get(`${API_URL}/by-type`, {
      params: {
        investmentType: investmentType, // Pass the investment type as a query parameter
      },
      headers: {
        "auth-token": getAuthToken(), // Include the auth token in the headers for authentication
      },
    });

    return response.data; // Return the fetched investments data from the response
  } catch (error) {
    console.error("Error fetching investments by type:", error);
    throw error; // Rethrow the error to be handled in the component
  }
};
