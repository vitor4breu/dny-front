import React from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import './style.css';

const ContratosLista: React.FC = () => {
  const contratos = useAppSelector((state) => state.contract.contracts);

  return (
    <TableContainer >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nº</TableCell>
            <TableCell align="right">Nome do responsável</TableCell>
            <TableCell align="right">Escola</TableCell>
            <TableCell align="right">Cidade - UF</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contratos.map((contrato) => (
            <TableRow key={contrato.id}>
              <TableCell>{contrato.id}</TableCell>
              <TableCell>{contrato.nomeResponsavel}</TableCell>
              <TableCell>{contrato.escola}</TableCell>
              <TableCell>{contrato.cidade}-{contrato.uf}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContratosLista;