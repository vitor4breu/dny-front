import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getItems = async () => {
  const response = await axios.get(`${API_URL}/AdditionalController`);
  return response.data;
};

const additionalService = {
  getItems,
};

export default additionalService;

export {};