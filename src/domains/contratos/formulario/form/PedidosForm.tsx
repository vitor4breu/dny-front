import React from "react";
import Box from "@components/@extended/Box";
import {
  Grid,
  TextField,
  FormControl,
  FormLabel,
  Typography,
  FormControlLabel,
  Button,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import ReactInputMask from "react-input-mask";

import { IPedidoForm, pedidoFormInitalState } from "../helpers/formTypes";
import { ControlledSwitch } from "@components/@extended/ControlledSwitch";
import { UF_LIST } from "@utils/consts";
import ContratosService from "services/contratoService";
import { mapPedidoFormToApi } from "../helpers/form.helpers";

interface IProps {
  onPedidoSalvo: (id: string) => void;
}

const PedidosForm = ({ onPedidoSalvo }: IProps) => {
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({ defaultValues: pedidoFormInitalState });

  const onsubmit = async (data: IPedidoForm) => {
    console.log("criado pedido", data);

    try {
      const response = await ContratosService.CriarContrato(
        mapPedidoFormToApi(data)
      );
      onPedidoSalvo(response.toString());
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onUpdateCep = (e: any) => {
    const numericValue = e.target.value.replace(/\D/g, "");
    setValue("cep", numericValue);

    if (numericValue.length === 8) {
      fetchEndereco(numericValue);
    }
  };

  const fetchEndereco = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setValue("rua", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
      }
    } catch (error) {
      console.error("Error fetching endereco:", error);
    }
  };

  const tipoEntrega = watch("tipoEntrega");

  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Box
          title="Informações do(s) representante(s)"
          titleProps={{ variant: "subtitle1", fontFamily: "inter" }}
          mb={2}
        >
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                size="small"
                sx={{ mt: 2 }}
                error={!!errors.nomeEscola}
              >
                <FormLabel sx={{ mb: 0.5 }}>
                  <Typography variant="subtitle2">Nome da escola</Typography>
                </FormLabel>
                <Controller
                  name="nomeEscola"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Nome da escola é obrigatório",
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.nomeEscola}
                      helperText={errors.nomeEscola?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid container item spacing={1} marginTop={0} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  Representante principal
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="nomeRep1"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Nome é obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      label="Nome"
                      error={!!errors.nomeRep1}
                      helperText={errors.nomeRep1?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="sobrenomeRep1"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Sobrenome é obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      label="Sobrenome"
                      error={!!errors.sobrenomeRep1}
                      helperText={errors.sobrenomeRep1?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="telefoneRep1"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Telefone é obrigatório" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      label="Telefone"
                      error={!!errors.telefoneRep1}
                      helperText={errors.telefoneRep1?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container item spacing={1} marginTop={0} alignItems="center">
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  Representante substituto
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="nomeRep2"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      label="Nome"
                      error={!!errors.nomeRep2}
                      helperText={errors.nomeRep2?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="sobrenomeRep2"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      label="Sobrenome"
                      error={!!errors.sobrenomeRep2}
                      helperText={errors.sobrenomeRep2?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="telefoneRep2"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      size="small"
                      label="Telefone"
                      error={!!errors.telefoneRep2}
                      helperText={errors.telefoneRep2?.message}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box
          title="Informações do pedido"
          titleProps={{ variant: "subtitle1", fontFamily: "inter" }}
          sx={{ mb: 2 }}
        >
          <Grid container spacing={2}>
            {/* Bandeira */}
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                Bandeira
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <ControlledSwitch name="possuiBandeira" control={control} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="dataEntrega"
                control={control}
                rules={{ required: "Data de entrega é obrigatória" }}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      {...field}
                      label="Data de Entrega"
                      format="DD/MM/YYYY"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(newValue) =>
                        field.onChange(
                          newValue ? newValue.format("YYYY-MM-DD") : ""
                        )
                      }
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "small",
                          error: !!errors.dataEntrega,
                          helperText: errors.dataEntrega?.message,
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          title="Informações de entrega"
          titleProps={{ variant: "subtitle1", fontFamily: "inter" }}
        >
          <RadioGroup
            row
            value={watch("tipoEntrega")}
            onChange={(e) =>
              setValue("tipoEntrega", Number(e.target.value) as 1 | 2)
            }
            sx={{
              gap: 4,
              mb: 1,
            }}
          >
            <FormControlLabel value="1" control={<Radio />} label="Entrega" />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Retirada no local"
            />
          </RadioGroup>

          {tipoEntrega === 1 && (
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Controller
                  name="cep"
                  control={control}
                  rules={{
                    required: tipoEntrega === 1 ? "CEP é obrigatório" : false,
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="CEP"
                      size="small"
                      placeholder="00000-000"
                      InputProps={{
                        inputComponent: ReactInputMask as any,
                        inputProps: {
                          mask: "99999-999",
                          maskChar: null,
                        },
                      }}
                      onChange={(e) => {
                        field.onChange(e);
                        onUpdateCep(e);
                      }}
                      sx={{
                        "& input": {
                          letterSpacing: "1px",
                        },
                      }}
                      error={!!errors.cep}
                      helperText={errors.cep?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name="rua"
                  control={control}
                  rules={{
                    required: tipoEntrega === 1 ? "Rua é obrigatório" : false,
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Rua"
                      error={!!errors.cep}
                      helperText={errors.cep?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="numero"
                  control={control}
                  rules={{
                    required:
                      tipoEntrega === 1 ? "Número é obrigatório" : false,
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Número"
                      error={!!errors.cep}
                      helperText={errors.cep?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name="complemento"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} fullWidth label="Complemento" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="bairro"
                  control={control}
                  rules={{
                    required:
                      tipoEntrega === 1 ? "Bairro é obrigatório" : false,
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Bairro"
                      error={!!errors.bairro}
                      helperText={errors.bairro?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={8}>
                <Controller
                  name="cidade"
                  control={control}
                  rules={{
                    required:
                      tipoEntrega === 1 ? "Cidade é obrigatório" : false,
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Cidade"
                      error={!!errors.cidade}
                      helperText={errors.cidade?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth error={!!errors.estado}>
                  <Controller
                    name="estado"
                    control={control}
                    rules={{
                      required:
                        tipoEntrega === 1 ? "Estado é obrigatório" : false,
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        displayEmpty
                        size="small"
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 240,
                              overflow: "auto",
                            },
                          },
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
                    )}
                  />
                  {errors.estado && (
                    <FormHelperText>{errors.estado.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          )}
        </Box>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            fontWeight: "bold",
            fontSize: "0.9rem",
            padding: "8px 24px",
            marginTop: "16px",
            marginLeft: "auto",
            marginRight: "0",
            display: "block",
          }}
        >
          Criar Contrato
        </Button>
      </form>
    </>
  );
};

export default PedidosForm;
