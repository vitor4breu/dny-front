import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getItems = async () => {
  const response = await axios.get(`${API_URL}/CosturaController`);
  return response.data;
};

const costuraService = {
  getItems,
};

export default costuraService;

export {};