import axios from "axios";

const url = process.env.REACT_APP_BURL;

export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${url}/api/auth/create`, { email, name, password });
    console.log("Signup response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${url}/api/auth/login`, { email, password });
    console.log("Login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};
