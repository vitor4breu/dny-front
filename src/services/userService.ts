import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const getUsers = async () => {
  const response = await axios.get(`${API_URL}/UserController`);
  return response.data;
};

const userService = {
  getUsers,
};

export default userService;

export {};