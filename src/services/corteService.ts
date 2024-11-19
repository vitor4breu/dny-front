import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getItems = async () => {
  const response = await axios.get(`${API_URL}/TirantesController`);
  return response.data;
};

const tirantesService = {
  getItems,
};

export default tirantesService;

export {};