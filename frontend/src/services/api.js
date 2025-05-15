import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  getEmployees: async (params) => {
    const response = await axios.get(`${API_BASE_URL}/employees`, { params });
    return response.data;
  },

  getEmployeeById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/employees/${id}`);
    return response.data;
  }
}; 