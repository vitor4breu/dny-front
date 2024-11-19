import axios from 'axios';
import { ContratoModel } from '../Contrato';

const API_URL = process.env.REACT_APP_API_URL;

const nomes = ['Ana', 'João', 'Maria', 'Carlos', 'Juliana', 'Paulo', 'Fernanda', 'Rafael', 'Gabriela', 'Lucas'];
const sobrenomes = ['Silva', 'Souza', 'Oliveira', 'Pereira', 'Lima', 'Almeida', 'Costa', 'Ferreira', 'Rodrigues'];

// Lista de cidades e estados (UF)
const cidades = ['Porto Alegre', 'Curitiba', 'São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Florianópolis', 'Recife', 'Salvador'];
const ufs = ['RS', 'PR', 'SP', 'RJ', 'MG', 'SC', 'PE', 'BA'];

// Função para gerar um nome completo aleatório
const gerarNome = (): string => {
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  return `${nome} ${sobrenome}`;
};

// Função para gerar um nome de escola aleatório
const gerarEscola = (): string => {
  const sufixos = ['Colégio', 'Escola', 'Instituto', 'Centro Educacional'];
  const nomeEscola = nomes[Math.floor(Math.random() * nomes.length)];
  const sufixo = sufixos[Math.floor(Math.random() * sufixos.length)];
  return `${sufixo} ${nomeEscola}`;
};

// Função para gerar contratos aleatórios
export const gerarContratosAleatorios = (quantidade: number): ContratoModel[] => {
  return Array.from({ length: quantidade }, (_, index) => ({
    id: index + 1, // ID sequencial
    nomeResponsavel: gerarNome(),
    escola: gerarEscola(),
    cidade: cidades[Math.floor(Math.random() * cidades.length)],
    uf: ufs[Math.floor(Math.random() * ufs.length)],
  }));
};

const contratos = gerarContratosAleatorios(10);


export type ObterContratosQuery = {
  pesquisa? : string;
  escola? : string;
  cidade? : string;
  uf? : string;
}


const handle = async (q? : ObterContratosQuery) => {
return contratos.filter(
  c => !q || (
   (!q.cidade || c.cidade === q.cidade) &&
   (!q.escola || c.escola === q.escola) &&
   (!q.uf || c.uf === q.uf) &&
   (!q.pesquisa || c.nomeResponsavel.toLowerCase().includes(q.pesquisa.toLowerCase()))
  )
);

 /* const response = await axios.get(`${API_URL}/ContractController`);
  return response.data as ContratoModel[];*/
};

const ObterContratosQueryHandler = {
  handle,
};

export default ObterContratosQueryHandler;

export {};