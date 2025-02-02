import React, { useEffect } from 'react';
import Box from "@components/@extended/Box";
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useFormStore from '../formStore';
import { useShallow } from 'zustand/react/shallow';
import AlunoInput from './components/AlunoInput';
import ContratosService from 'services/contratoService';

const AlunosForm: React.FC = () => {

  const alunosIndex = useFormStore(useShallow((state) => state.alunos.map((a, i) => i)));
  const handleAddAluno = useFormStore((state) => state.handleAddAluno);
  const setCoresMoletom = useFormStore(useShallow((state) => state.setCoresMoletom));
  const setCoresCamisa = useFormStore(useShallow((state) => state.setCoresCamisa));

  useEffect(() => {
    ContratosService.ObterCoresCamisa().then(setCoresCamisa);
    ContratosService.ObterCoresMoletom().then(setCoresMoletom);
  }, []);

  return (
    <Box
      title="Informações dos Alunos"
      titleProps={{ variant: 'subtitle1', fontFamily: 'inter' }}
    >
      {alunosIndex.map(i => 
        <AlunoInput key={i} index={i}/>
      )}
      <Button
        startIcon={<AddIcon />}
        onClick={handleAddAluno}
        size="small"
        variant="contained"
        color="secondary"
      >
        Adicionar Aluno
      </Button>
    </Box>
  );
};

export default AlunosForm;