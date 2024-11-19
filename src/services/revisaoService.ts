import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getItems = async () => {
  const response = await axios.get(`${API_URL}/RevisaoController`);
  return response.data;
};

const revisaoService = {
  getItems,
};

export default revisaoService;

export {};