import React, { useState } from 'react';
import { Grid, FormControl, FormLabel, TextField, Typography, Box as MuiBox, Switch, Tooltip, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Aluno } from 'domains/contratos/novoContrato/types';
import useFormStore from '../../formStore';

interface CanecaInputProps {
  aluno: Aluno;
  index: number;
}

const CanecaInput: React.FC<CanecaInputProps> = ({ aluno, index }) => {
  const [nomePersonalizado, setNomePersonalizado] = useState<boolean>(!!aluno.caneca?.nomePersonalizado);
  const [tirante, setTirante] = useState<boolean>(!!aluno.caneca?.tirante);
  

  const updateAluno = useFormStore((state) => state.updateAluno);
  const detalhesPedido = useFormStore((state) => state.detalhesPedido);

  const handleNomePersonalizadoToggle = () => {
    setNomePersonalizado(!nomePersonalizado);
    if (!nomePersonalizado) {
      updateAluno(index, 'caneca', { ...aluno.caneca, nomePersonalizado: '' });
    } else {
      const { nomePersonalizado, ...rest } = aluno.caneca || {};
      updateAluno(index, 'caneca', rest);
    }
  };

  const handleTiranteToggle = () => {
    setTirante(!tirante);
    if (!tirante) {
      updateAluno(index, 'caneca', { ...aluno.caneca, tirante: true });
    } else {
      const { tirante, ...rest } = aluno.caneca || {};
      updateAluno(index, 'caneca', rest);
    }
  };

  return (
    <>
      <Grid item xs={12} pt="4px !important">
        <MuiBox display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight={"bold"} display={'inline'}> Caneca</Typography>
          
          <Button
            startIcon={<Delete />}
            onClick={() => updateAluno(index, 'caneca', undefined)}
            sx={{
              fontWeight: 'bold',
              letterSpacing: '0.02857em',
              color: '#f35955',
              paddingBottom: 0
            }}
            size="small"
          >
            Remover
          </Button>
        </MuiBox>
      </Grid>
    {detalhesPedido.possuiNomePersonalizado && (
    <Grid item xs={12} md="auto">
        <FormControl fullWidth>
        <FormLabel sx={{ margin: "auto" }}>
            <Typography variant="subtitle2">Nome Personalizado</Typography>
        </FormLabel>
        <Tooltip title={nomePersonalizado ? "Remover nome personalizado" : "Adicionar nome personalizado"}>
            <Switch
            sx={{ margin: "auto" }}
            checked={nomePersonalizado}
            onChange={handleNomePersonalizadoToggle}
            color="primary"
            />
        </Tooltip>
        </FormControl>
    </Grid>
    )}
    {detalhesPedido.possuiTirante && (
    <Grid item xs={12} md="auto">
        <FormControl fullWidth>
        <FormLabel sx={{ margin: "auto" }}>
            <Typography variant="subtitle2">Tirante</Typography>
        </FormLabel>
        <Tooltip title={tirante ? "Remover tirante" : "Adicionar tirante"}>
            <Switch
            sx={{ margin: "auto" }}
            checked={tirante}
            onChange={handleTiranteToggle}
            color="primary"
            />
        </Tooltip>
        </FormControl>
    </Grid>
    )}
    {nomePersonalizado && (
    <Grid item md>
        <FormControl fullWidth>
        <FormLabel sx={{ mb: 0.5 }}>
            <Typography variant="subtitle2">Nome Personalizado</Typography>
        </FormLabel>
        <TextField
            fullWidth
            size="small"
            placeholder="Digite o nome personalizado"
            value={aluno.caneca?.nomePersonalizado || ''}
            onChange={(e) => updateAluno(index, 'caneca', { ...aluno.caneca, nomePersonalizado: e.target.value })}
        />
        </FormControl>
    </Grid>
    )}
    </>
  );
};

export default CanecaInput;