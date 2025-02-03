import React from "react";
import Box from "@components/@extended/Box";
import {
  Box as MuiBox,
  Grid,
  Typography,
  FormControlLabel,
  Switch,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import { DetalhesPedido } from "../../types";
import useFormStore from "../formStore";

const DetalhesPedidoForm: React.FC = () => {
  const setDetalhesPedido = useFormStore((state) => state.setDetalhesPedido);
  const detalhesPedido = useFormStore((state) => state.detalhesPedido);
  const coresCamisa = useFormStore((state) => state.coresCamisa);
  const coresMoletom = useFormStore((state) => state.coresMoletom);

  const handleChange =
    (field: keyof DetalhesPedido) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDetalhesPedido({
        ...detalhesPedido,
        [field]: event.target.checked,
      });
    };

  const getDisabledTooltip = (field: string) => {
    switch (field) {
      case "strap":
        return "O tirante só está disponível quando a caneca está selecionada";
      case "nomePersonalizado":
        return "O nome personalizado só está disponível quando camiseta ou moletom estão selecionados";
      case "hoodieSignature":
        return "A assinatura no capuz só está disponível quando o moletom está selecionado";
      default:
        return "";
    }
  };

  const FormControlWithTooltip = ({
    control,
    label,
    disabled,
    tooltipField,
  }: {
    control: React.ReactElement;
    label: string;
    disabled?: boolean;
    tooltipField?: string;
  }) => (
    <Tooltip
      title={disabled && tooltipField ? getDisabledTooltip(tooltipField) : ""}
      placement="top"
      arrow
    >
      <span>
        <FormControlLabel control={control} label={label} disabled={disabled} />
      </span>
    </Tooltip>
  );

  return (
    <Box
      title="Informações do pedido"
      titleProps={{ variant: "subtitle1", fontFamily: "inter" }}
      sx={{ mb: 2 }}
    >
      <Grid container spacing={2}>
        {/* Camiseta */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            Camiseta
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={detalhesPedido.possuiCamiseta}
                    onChange={handleChange("possuiCamiseta")}
                    color="primary"
                  />
                }
                label="Camiseta"
              />
            </Grid>
            <Grid item xs={3}>
              <Select
                fullWidth
                size="small"
                // value={aluno.camisa?.idCor || ''}
                // onChange={(e) => updateAluno(index, 'camisa', { ...aluno.camisa, cor: e.target.value })}
                displayEmpty
                sx={{ alignItems: "center" }}
              >
                <MenuItem value="" disabled>
                  <em>Selecione a cor</em>
                </MenuItem>
                {coresCamisa.map((color) => (
                  <MenuItem key={color.id} value={color.id}>
                    <MuiBox
                      sx={{
                        display: "inline-block",
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        backgroundColor: color.hex,
                        marginRight: 1,
                      }}
                    />
                    {color.nome}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
        </Grid>

        {/* Moletom */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            Moletom
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={detalhesPedido.possuiMoletom}
                    onChange={handleChange("possuiMoletom")}
                    color="primary"
                  />
                }
                label="Moletom"
              />
            </Grid>

            <Grid item xs={3}>
              <Select
                fullWidth
                size="small"
                // value={aluno.moletom?.idCor || ""}
                // onChange={(e) =>
                //   updateAluno(index, "moletom", {
                //     ...aluno.moletom,
                //     cor: e.target.value,
                //   })
                // }
                displayEmpty
              >
                <MenuItem value="" disabled>
                  <em>Selecione a cor</em>
                </MenuItem>
                {coresMoletom.map((color) => (
                  <MenuItem
                    key={color.id}
                    value={color.id}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <MuiBox
                      sx={{
                        display: "inline-block",
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        backgroundColor: color.hex,
                        marginRight: 1,
                      }}
                    />
                    {color.nome}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <FormControlWithTooltip
              control={
                <Switch
                  checked={detalhesPedido.possuiAssinaturaCapuzMoletom}
                  onChange={handleChange("possuiAssinaturaCapuzMoletom")}
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

        {/* Caneca */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            Acessórios
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={detalhesPedido.possuiCaneca}
                    onChange={handleChange("possuiCaneca")}
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
                    onChange={handleChange("possuiTirante")}
                    disabled={!detalhesPedido.possuiCaneca}
                    color="primary"
                  />
                }
                label="Tirante"
                disabled={!detalhesPedido.possuiCaneca}
                tooltipField="strap"
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Bandeira */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            Bandeira
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={detalhesPedido.possuiBandeira}
                    onChange={handleChange("possuiBandeira")}
                    color="primary"
                  />
                }
                label="Bandeira"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetalhesPedidoForm;
