import axios from "axios";

const url = process.env.REACT_APP_BURL;

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${url}/api/auth/create`, {
      email,
      name,
      password,
    });
    console.log("Signup response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Signup error:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${url}/api/auth/login`, {
      email,
      password,
    });
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Login error:",
      error.response ? error.response.data : error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${url}/api/auth/getuser`, {
      headers: {
        "auth-token": localStorage.getItem("auth-token"), // Include the auth token in the headers
      },
    });
    return response.data; // Return the list of investment types
  } catch (error) {
    console.error("Error fetching investment types:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
