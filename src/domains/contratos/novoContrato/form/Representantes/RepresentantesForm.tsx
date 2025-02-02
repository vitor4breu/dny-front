import React, { useEffect } from 'react';
import Box from "@components/@extended/Box";
import {
  Grid,
  TextField,
  Button,
  IconButton,
  FormControl,
  FormLabel,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import useFormStore from '../formStore';
import { Representante } from '../../types';


const RepresentanteForm: React.FC = () => {

  const escolaInput = useFormStore((state) => state.escolaInput);
  const setEscolaInput = useFormStore((state) => state.setEscolaInput);
  const representantes = useFormStore((state) => state.representantes) as Array<Representante>;
  const setRepresentantes = useFormStore((state) => state.setRepresentantes);
  const handleRemoveRepresentante = useFormStore((state) => state.handleRemoveRepresentante);
  const handleAddRepresentante = useFormStore((state) => state.handleAddRepresentante);

  return (
    <Box
      title="Informações do(s) representante(s)"
      titleProps={{ variant: 'subtitle1', fontFamily: 'inter' }}
      mb={2}
    >
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 1 }}>
              <Typography variant="subtitle2">Nome da escola</Typography>
            </FormLabel>
            <TextField
              fullWidth
              size="small"
              placeholder="Digite o nome da escola"
              value={escolaInput.escola}
              onChange={(e) => setEscolaInput({escola:e.target.value, error: undefined})}
              error={!!escolaInput.error}
              helperText={escolaInput.error}
            />
          </FormControl>
        </Grid>

        {representantes.map((rep, index) => (
          <Grid container item key={index} spacing={1} marginTop={0} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="subtitle2">{index === 0 ? "Representante principal" : "Representante substituto"}</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                label="Nome"
                value={rep.nome}
                onChange={(e) => {
                  const newReps = [...representantes];
                  newReps[index].nome = e.target.value;
                  setRepresentantes(newReps);
                }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                label="Sobrenome"
                value={rep.sobrenome}
                onChange={(e) => {
                  const newReps = [...representantes];
                  newReps[index].sobrenome = e.target.value;
                  setRepresentantes(newReps);
                }}
              />
            </Grid>
            <Grid item xs={3.4}>
              <TextField
                fullWidth
                size="small"
                label="Telefone"
                value={rep.telefone}
                onChange={(e) => {
                  const newReps = [...representantes];
                  newReps[index].telefone = e.target.value;
                  setRepresentantes(newReps);
                }}
              />
            </Grid>
            <Grid item xs={0.6} sx={{ pl: "10px !important" }}>
              {representantes.length > 1 && index > 0 && (
                <IconButton onClick={() => handleRemoveRepresentante(index)} size="small" sx={{ padding: "1px" }}>
                  <RemoveIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}

        {representantes.length < 2 && (
          <Button
            startIcon={<AddIcon />}
            onClick={handleAddRepresentante}
            sx={{
              marginTop: 1
            }}
            size="small"
            variant="contained"
            color="secondary"
          >
            Adicionar Representante
          </Button>
        )}
      </Grid>
    </Box>
  );
};

export default RepresentanteForm;