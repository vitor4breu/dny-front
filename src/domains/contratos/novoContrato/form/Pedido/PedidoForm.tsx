import { useEffect } from "react";

import {
  Box as MuiBox,
  Grid,
  Typography,
  Select,
  MenuItem,
  Button,
  TextField,
  Divider,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Controller, useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import { ControlledSwitch } from "@components/@extended/ControlledSwitch";
import useFormStore from "../formStore";
import ContratosService from "services/contratoService";
import { formInitalState, IForm } from "../../types/formTypes";
import {
  HOODIE_GENDER,
  NOT_EDIT,
  UNIFORM_GENDER,
  UNIFORM_SIZES,
} from "@utils/consts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { createAluno } from "@utils/helpers";

interface IProps {
  openModal: () => void;
}

const DetalhesPedidoForm = ({ openModal }: IProps) => {
  const coresCamisa = useFormStore((state) => state.coresCamisa);
  const coresMoletom = useFormStore((state) => state.coresMoletom);
  const coresCaneca = useFormStore((state) => state.coresCaneca);

  const addAluno = useFormStore((state) => state.addAluno);
  const setSelectedItem = useFormStore((state) => state.setSelectedItem);

  const setCoresMoletom = useFormStore(
    useShallow((state) => state.setCoresMoletom)
  );
  const setCoresCamisa = useFormStore(
    useShallow((state) => state.setCoresCamisa)
  );
  const setCoresCaneca = useFormStore(
    useShallow((state) => state.setCoresCaneca)
  );

  useEffect(() => {
    ContratosService.ObterCoresCamisa().then(setCoresCamisa);
    ContratosService.ObterCoresMoletom().then(setCoresMoletom);
    ContratosService.ObterCoresCaneca().then(setCoresCaneca);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: formInitalState,
  });

  const onCreate = (data: IForm) => {
    addAluno(createAluno(data));
    setValue("nomeAluno", "");
  };

  const onUpdate = (data: IForm) => {
    openModal();
    setSelectedItem(NOT_EDIT, createAluno(data));
    setValue("nomeAluno", "");
  };

  const possuiCamiseta = watch("possuiCamiseta");
  const possuiMoletom = watch("possuiMoletom");
  const possuiCaneca = watch("possuiCaneca");

  return (
    <Accordion defaultExpanded sx={{ mb: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1" fontFamily="inter">
          Assistente de preenchimento rápido
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleSubmit(onCreate)}>
          <Grid container spacing={2} sx={{ mt: 2, minHeight: "300px" }}>
            <Grid item md={12} lg={3.8}>
              <Typography variant="h6">
                Camiseta{" "}
                <ControlledSwitch name="possuiCamiseta" control={control} />
              </Typography>

              {possuiCamiseta && (
                <>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                    error={!!errors.modeloCamiseta}
                  >
                    <Controller
                      name="modeloCamiseta"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Selecione um modelo" }}
                      render={({ field }) => (
                        <Select {...field} fullWidth size="small" displayEmpty>
                          <MenuItem value="" disabled>
                            <em>Selecione o modelo</em>
                          </MenuItem>
                          {UNIFORM_GENDER.map((gender) => (
                            <MenuItem key={gender.value} value={gender.value}>
                              {gender.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.modeloCamiseta && (
                      <FormHelperText>
                        {errors.modeloCamiseta.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                    error={!!errors.tamanhoCamiseta}
                  >
                    <Controller
                      name="tamanhoCamiseta"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Selecione um tamanho" }}
                      render={({ field }) => (
                        <Select {...field} fullWidth size="small" displayEmpty>
                          <MenuItem value="" disabled>
                            <em>Selecione o tamanho</em>
                          </MenuItem>
                          {UNIFORM_SIZES.map((size) => (
                            <MenuItem key={size.value} value={size.value}>
                              {size.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.tamanhoCamiseta && (
                      <FormHelperText>
                        {errors.tamanhoCamiseta.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                    error={!!errors.corCamiseta}
                  >
                    <Controller
                      name="corCamiseta"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Selecione uma cor" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          fullWidth
                          size="small"
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
                      )}
                    />
                    {errors.corCamiseta && (
                      <FormHelperText>
                        {errors.corCamiseta.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </>
              )}
            </Grid>

            <Grid item md={12} lg={0.2}>
              <Divider
                orientation="vertical"
                sx={{ height: "100%", display: { xs: "none", lg: "block" } }}
              />
            </Grid>

            <Grid item md={12} lg={3.8}>
              <Typography variant="h6">
                Moletom{" "}
                <ControlledSwitch name="possuiMoletom" control={control} />
              </Typography>

              {possuiMoletom && (
                <>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                    error={!!errors.modeloMoletom}
                  >
                    <Controller
                      name="modeloMoletom"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Selecione um modelo" }}
                      render={({ field }) => (
                        <Select {...field} fullWidth size="small" displayEmpty>
                          <MenuItem value="" disabled>
                            <em>Selecione o modelo</em>
                          </MenuItem>
                          {HOODIE_GENDER.map((gender) => (
                            <MenuItem key={gender.value} value={gender.value}>
                              {gender.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.modeloMoletom && (
                      <FormHelperText>
                        {errors.modeloMoletom.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                    error={!!errors.tamanhoMoletom}
                  >
                    <Controller
                      name="tamanhoMoletom"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Selecione um tamanho" }}
                      render={({ field }) => (
                        <Select {...field} fullWidth size="small" displayEmpty>
                          <MenuItem value="" disabled>
                            <em>Selecione o tamanho</em>
                          </MenuItem>
                          {UNIFORM_SIZES.map((size) => (
                            <MenuItem key={size.value} value={size.value}>
                              {size.label}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.tamanhoMoletom && (
                      <FormHelperText>
                        {errors.tamanhoMoletom.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                    error={!!errors.corMoletom}
                  >
                    <Controller
                      name="corMoletom"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Selecione uma cor" }}
                      render={({ field }) => (
                        <Select {...field} fullWidth size="small" displayEmpty>
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
                      )}
                    />
                    {errors.corMoletom && (
                      <FormHelperText>
                        {errors.corMoletom.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <ControlledSwitch
                    name="possuiAssinaturaMoletom"
                    control={control}
                    label="Adicionar Assinatura"
                  />
                </>
              )}
            </Grid>

            <Grid item md={12} lg={0.2}>
              <Divider
                orientation="vertical"
                sx={{ height: "100%", display: { xs: "none", lg: "block" } }}
              />
            </Grid>

            <Grid item md={12} lg={3.8}>
              <Typography variant="h6">
                Caneca{" "}
                <ControlledSwitch name="possuiCaneca" control={control} />
              </Typography>

              {possuiCaneca && (
                <>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                    error={!!errors.corCaneca}
                  >
                    <Controller
                      name="corCaneca"
                      control={control}
                      defaultValue=""
                      rules={{ required: "Selecione uma cor" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          fullWidth
                          size="small"
                          displayEmpty
                          sx={{ alignItems: "center" }}
                        >
                          <MenuItem value="" disabled>
                            <em>Selecione a cor</em>
                          </MenuItem>
                          {coresCaneca.map((color) => (
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
                      )}
                    />
                    {errors.corCaneca && (
                      <FormHelperText>
                        {errors.corCaneca.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <ControlledSwitch
                    name="possuiTiranteCaneca"
                    control={control}
                    label="Adicionar Tirante"
                  />
                </>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item md={12} lg={8}>
              <TextField
                label="Nome do Aluno"
                variant="outlined"
                fullWidth
                margin="normal"
                error={!!errors.nomeAluno}
                helperText={errors.nomeAluno?.message}
                {...register("nomeAluno", {
                  required: "Nome do aluno é obrigatório",
                })}
              />
            </Grid>

            <Grid item md={6} lg={2}>
              <FormControl size="small" sx={{ mt: 2 }}>
                <Button
                  startIcon={<AddIcon />}
                  type="submit"
                  size="small"
                  variant="contained"
                  color="secondary"
                >
                  Adicionar
                </Button>
              </FormControl>
            </Grid>
            <Grid item md={6} lg={2}>
              <FormControl size="small" sx={{ mt: 2 }}>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => handleSubmit(onUpdate)()}
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  Personalizar
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default DetalhesPedidoForm;
