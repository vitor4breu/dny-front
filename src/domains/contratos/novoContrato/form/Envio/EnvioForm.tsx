import React from 'react';
import Box from "@components/@extended/Box";
import {
  Grid,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  MenuItem
} from '@mui/material';
import ReactInputMask from 'react-input-mask';
import { UF_LIST } from '@utils/consts';
import { Endereco, TipoEnvio } from '../../types';
import useFormStore from '../formStore';

const DeliveryForm: React.FC = () => {

  const detalhesEnvio = useFormStore((state) => state.detalhesEnvio);
  const setDetalhesEnvio = useFormStore((state) => state.setDetalhesEnvio);
  const updateEndereco = useFormStore((state) => state.updateEndereco);

  const onUpdateCep = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    setDetalhesEnvio({...detalhesEnvio, endereco: {...detalhesEnvio.endereco, cep: numericValue}});
    //updateEndereco('cep', numericValue);
    if (numericValue.length === 8) {
      fetchEndereco(numericValue);
    }
  }


  const fetchEndereco = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setDetalhesEnvio({
          ...detalhesEnvio,
          endereco: {
            ...detalhesEnvio.endereco,
            rua: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf
          }
        });
      }
    } catch (error) {
      console.error('Error fetching endereco:', error);
    }
  };

  return (
    <Box
      title="Informações de entrega"
      titleProps={{ variant: 'subtitle1', fontFamily: 'inter' }}
    >
      <RadioGroup
        row
        value={detalhesEnvio.tipo}
        onChange={(e) => setDetalhesEnvio({ ...detalhesEnvio, tipo: Number(e.target.value) as TipoEnvio})}
        sx={{
          gap: 4,
          mb: 1
        }}
      >
        <FormControlLabel value="1" control={<Radio />} label="Entrega" />
        <FormControlLabel value="2" control={<Radio />} label="Retirada no local" />
      </RadioGroup>

      {detalhesEnvio.tipo === TipoEnvio.Entrega && (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="CEP"
              value={detalhesEnvio.endereco.cep}
              size="small"
              placeholder="00000-000"
              InputProps={{
                inputComponent: ReactInputMask as any,
                inputProps: {
                  mask: '99999-999',
                  maskChar: null,
                }
              }}
              onChange={onUpdateCep}
              sx={{
                '& input': {
                  letterSpacing: '1px'
                }
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Rua"
              value={detalhesEnvio.endereco.rua}
              onChange={(e) => updateEndereco('rua', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Número"
              value={detalhesEnvio.endereco.numero}
              onChange={(e) => updateEndereco('numero', e.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Complemento"
              value={detalhesEnvio.endereco.complemento}
              onChange={(e) => updateEndereco('complemento', e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Bairro"
              value={detalhesEnvio.endereco.bairro}
              onChange={(e) => updateEndereco('bairro', e.target.value)}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              label="Cidade"
              value={detalhesEnvio.endereco.cidade}
              onChange={(e) => updateEndereco('cidade', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              fullWidth
              value={detalhesEnvio.endereco.estado}
              onChange={(e) => updateEndereco('estado', e.target.value)}
              displayEmpty
              size="small"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 240,
                    overflow: 'auto'
                  }
                }
              }}
            >
              <MenuItem value="" disabled>
                <em>Selecione o estado</em>
              </MenuItem>
              {UF_LIST.map((uf) => (
                <MenuItem key={uf.value} value={uf.value}>
                  {uf.value}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DeliveryForm;