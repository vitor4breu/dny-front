import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getItems = async () => {
  const response = await axios.get(`${API_URL}/FinalizacaoArteController`);
  return response.data;
};

const finalizacaoArteService = {
  getItems,
};

export default finalizacaoArteService;

export {};