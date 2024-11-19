import axios from 'axios';

const API_URL = 'https://localhost:7104';//process.env.REACT_APP_API_URL;

interface LoginResponse {
  token: string;
  expiresIn: number; // Tempo de expiração em segundos (ex.: 1 hora)
}

const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlciI6IlZpdG9yIEFicmV1IiwidXNlcklkIjoiMTI1IiwiaWF0IjoxNTE2MjM5MDIyfQ.KKsqFPUpdx5VWPHASaMaqEMI56L93zRZQ5udpL47DoA';
const MOCK_EXPIRES_IN = 3600; // 1 hora (em segundos)

export const login = async (
  username: string, 
  password: string
): Promise<LoginResponse> => {
  // Mock para simular autenticação
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'admin' && password === 'password') {
        resolve({
          token: MOCK_TOKEN,
          expiresIn: MOCK_EXPIRES_IN,
        });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000); // Simula latência de 1 segundo
  });
};

export const refreshToken = async (): Promise<void> => {
  // Mock para o refresh token (caso necessário)
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500); // Simula latência de 500ms
  });
};

