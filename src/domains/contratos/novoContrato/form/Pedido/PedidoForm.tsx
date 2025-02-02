import React from 'react';
import Box from "@components/@extended/Box";
import {
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  Tooltip
} from '@mui/material';
import { DetalhesPedido } from '../../types';
import useFormStore from '../formStore';

const DetalhesPedidoForm: React.FC = () => {

  const setDetalhesPedido = useFormStore((state) => state.setDetalhesPedido);
  const detalhesPedido = useFormStore((state) => state.detalhesPedido);

  const handleChange = (field: keyof DetalhesPedido) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDetalhesPedido({
      ...detalhesPedido,
      [field]: event.target.checked
    });
  };

  const getDisabledTooltip = (field: string) => {
    switch (field) {
      case 'strap':
        return 'O tirante só está disponível quando a caneca está selecionada';
      case 'nomePersonalizado':
        return 'O nome personalizado só está disponível quando camiseta ou moletom estão selecionados';
      case 'hoodieSignature':
        return 'A assinatura no capuz só está disponível quando o moletom está selecionado';
      default:
        return '';
    }
  };

  const FormControlWithTooltip = ({ 
    control, 
    label, 
    disabled, 
    tooltipField 
  }: { 
    control: React.ReactElement; 
    label: string; 
    disabled?: boolean;
    tooltipField?: string;
  }) => (
    <Tooltip 
      title={disabled && tooltipField ? getDisabledTooltip(tooltipField) : ''}
      placement="top"
      arrow
    >
      <span>
        <FormControlLabel
          control={control}
          label={label}
          disabled={disabled}
        />
      </span>
    </Tooltip>
  );

  return (
    <Box
      title="Informações do pedido"
      titleProps={{ variant: 'subtitle1', fontFamily: 'inter' }}
      sx={{ mb: 2 }}
    >
      <Grid container spacing={2}>
        {/* Produtos principais */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Produtos principais
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={detalhesPedido.possuiCamiseta}
                    onChange={handleChange('possuiCamiseta')}
                    color="primary"
                  />
                }
                label="Camiseta"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={detalhesPedido.possuiMoletom}
                    onChange={handleChange('possuiMoletom')}
                    color="primary"
                  />
                }
                label="Moletom"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Acessórios */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Acessórios
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={detalhesPedido.possuiCaneca}
                    onChange={handleChange('possuiCaneca')}
                    color="primary"
                  />
                }
                label="Caneca"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlWithTooltip
                control={
                  <Switch
                    checked={detalhesPedido.possuiTirante}
                    onChange={handleChange('possuiTirante')}
                    disabled={!detalhesPedido.possuiCaneca}
                    color="primary"
                  />
                }
                label="Tirante"
                disabled={!detalhesPedido.possuiCaneca}
                tooltipField="strap"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={detalhesPedido.possuiBandeira}
                    onChange={handleChange('possuiBandeira')}
                    color="primary"
                  />
                }
                label="Bandeira"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Personalizações */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
            Personalizações
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlWithTooltip
                control={
                  <Switch
                    checked={detalhesPedido.possuiNomePersonalizado}
                    onChange={handleChange('possuiNomePersonalizado')}
                    disabled={!detalhesPedido.possuiCamiseta && !detalhesPedido.possuiMoletom}
                    color="primary"
                  />
                }
                label="Nome personalizado"
                disabled={!detalhesPedido.possuiCamiseta && !detalhesPedido.possuiMoletom}
                tooltipField="nomePersonalizado"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControlWithTooltip
                control={
                  <Switch
                    checked={detalhesPedido.possuiAssinaturaCapuzMoletom}
                    onChange={handleChange('possuiAssinaturaCapuzMoletom')}
                    disabled={!detalhesPedido.possuiMoletom}
                    color="primary"
                  />
                }
                label="Assinatura no capuz"
                disabled={!detalhesPedido.possuiMoletom}
                tooltipField="hoodieSignature"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetalhesPedidoForm;