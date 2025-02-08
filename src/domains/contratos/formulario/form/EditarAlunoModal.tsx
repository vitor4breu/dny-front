import { useEffect } from "react";

import {
  Box as MuiBox,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
  Select,
  FormHelperText,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useShallow } from "zustand/react/shallow";
import { Controller, useForm } from "react-hook-form";

import Box from "@components/@extended/Box";
import { ControlledSwitch } from "@components/@extended/ControlledSwitch";
import { createAluno, createFormFromAluno } from "@utils/helpers";
import useFormStore from "./formStore";
import {
  HOODIE_GENDER,
  NOT_EDIT,
  UNIFORM_GENDER,
  UNIFORM_SIZES,
} from "@utils/consts";
import { IAlunoForm } from "../helpers/formTypes";

interface IProps {
  closeModal: () => void;
}

const EditarAlunoModal = ({ closeModal }: IProps) => {
  const {
    selectedItem: [id, aluno],
    coresCamisa,
    coresMoletom,
    coresCaneca,
    addAluno,
    updateAluno,
  } = useFormStore(
    useShallow((state) => ({
      selectedItem: state.selectedItem,
      coresCamisa: state.coresCamisa,
      coresMoletom: state.coresMoletom,
      coresCaneca: state.coresCaneca,
      addAluno: state.addAluno,
      updateAluno: state.updateAluno,
    }))
  );

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: createFormFromAluno(aluno),
  });

  const possuiNomePersonalizadoCamiseta = watch(
    "possuiNomePersonalizadoCamiseta"
  );
  const possuiNomePersonalizadoMoletom = watch(
    "possuiNomePersonalizadoMoletom"
  );
  const possuiNomePersonalizadoCaneca = watch("possuiNomePersonalizadoCaneca");

  useEffect(() => {
    if (!possuiNomePersonalizadoCamiseta) {
      setValue("nomePersonalizadoCamiseta", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [possuiNomePersonalizadoCamiseta]);

  useEffect(() => {
    if (!possuiNomePersonalizadoMoletom) {
      setValue("nomePersonalizadoMoletom", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [possuiNomePersonalizadoMoletom]);

  useEffect(() => {
    if (!possuiNomePersonalizadoCaneca) {
      setValue("nomePersonalizadoCaneca", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [possuiNomePersonalizadoCaneca]);

  const onSubmit = (data: IAlunoForm) => {
    if (id === NOT_EDIT) {
      addAluno(createAluno(data));
    } else {
      updateAluno(id, createAluno(data));
    }

    closeModal();
  };

  const possuiCamiseta = watch("possuiCamiseta");
  const possuiMoletom = watch("possuiMoletom");
  const possuiCaneca = watch("possuiCaneca");

  return (
    <Box
      sx={{
        mb: 2,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        position: "relative",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1.5}>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              size="small"
              sx={{ mt: 2 }}
              error={!!errors.nomeAluno}
            >
              <FormLabel sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2">Nome do Aluno</Typography>
              </FormLabel>
              <Controller
                name="nomeAluno"
                control={control}
                defaultValue=""
                rules={{
                  required: "Nome do aluno é obrigatório",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.nomeAluno}
                    helperText={errors.nomeAluno?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider orientation="horizontal" />
          </Grid>

          <Grid item md={12} pt="4px !important">
            <MuiBox display="flex" justifyContent="space-between">
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                display="inline"
              >
                Camiseta
              </Typography>

              <ControlledSwitch name="possuiCamiseta" control={control} />
            </MuiBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              size="small"
              sx={{ mt: 2 }}
              error={!!errors.modeloCamiseta}
              disabled={!possuiCamiseta}
            >
              <FormLabel sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2">Modelo</Typography>
              </FormLabel>
              <Controller
                name="modeloCamiseta"
                control={control}
                defaultValue=""
                rules={{
                  required: possuiCamiseta ? "Selecione um modelo" : false,
                }}
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
                <FormHelperText>{errors.modeloCamiseta.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              size="small"
              sx={{ mt: 2 }}
              error={!!errors.tamanhoCamiseta}
              disabled={!possuiCamiseta}
            >
              <FormLabel sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2">Tamanho</Typography>
              </FormLabel>
              <Controller
                name="tamanhoCamiseta"
                control={control}
                defaultValue=""
                rules={{
                  required: possuiCamiseta ? "Selecione um tamanho" : false,
                }}
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
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              size="small"
              sx={{ mt: 2 }}
              error={!!errors.corCamiseta}
              disabled={!possuiCamiseta}
            >
              <FormLabel sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2">Cor</Typography>
              </FormLabel>
              <Controller
                name="corCamiseta"
                control={control}
                defaultValue=""
                rules={{
                  required: possuiCamiseta ? "Selecione uma cor" : false,
                }}
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
                <FormHelperText>{errors.corCamiseta.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid item xs>
            <FormControl fullWidth size="small" sx={{ mt: 2 }}>
              <FormLabel sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2">
                  Nome Personalizado{" "}
                  <ControlledSwitch
                    name="possuiNomePersonalizadoCamiseta"
                    control={control}
                    disabled={!possuiCamiseta}
                  />
                </Typography>
              </FormLabel>
              <Controller
                name="nomePersonalizadoCamiseta"
                control={control}
                defaultValue=""
                rules={{
                  required: possuiNomePersonalizadoCamiseta
                    ? "Se selecionado, nome personalizado é obrigatório"
                    : false,
                }}
                disabled={!possuiNomePersonalizadoCamiseta || !possuiCamiseta}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.nomePersonalizadoCamiseta}
                    helperText={errors.nomePersonalizadoCamiseta?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider orientation="horizontal" />
          </Grid>

          <Grid item md={12} pt="4px !important">
            <MuiBox display="flex" justifyContent="space-between">
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                display="inline"
              >
                Moletom
              </Typography>

              <ControlledSwitch name="possuiMoletom" control={control} />
            </MuiBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              size="small"
              sx={{ mt: 2 }}
              error={!!errors.modeloMoletom}
              disabled={!possuiMoletom}
            >
              <FormLabel sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2">Modelo</Typography>
              </FormLabel>
              <Controller
                name="modeloMoletom"
                control={control}
                defaultValue=""
                rules={{
                  required: possuiMoletom ? "Selecione um modelo" : false,
                }}
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
                <FormHelperText>{errors.modeloMoletom.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl
              fullWidth
              size="small"
              sx={{ mt: 2 }}
              error={!!errors.tamanhoMoletom}
              disabled={!possuiMoletom}
            >
              <FormLabel sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2">Tamanho</Typography>
              </FormLabel>
              <Controller
                name="tamanhoMoletom"
                control={control}
                defaultValue=""
                rules={{
                  required: possuiMoletom ? "Selecione um tamanho" : false,
                }}
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
                <FormHelperText>{errors.tamanhoMoletom.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl
              fullWidth
              size="small"
              sx={{ mt: 2 }}
              error={!!errors.corMoletom}
              disabled={!possuiMoletom}
            >
              <FormLabel sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2">Cor</Typography>
              </FormLabel>
              <Controller
                name="corMoletom"
                control={control}
                defaultValue=""
                rules={{
                  required: possuiMoletom ? "Selecione uma cor" : false,
                }}
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
                    {coresMoletom.map((color) => (
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
              {errors.corMoletom && (
                <FormHelperText>{errors.corMoletom.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                pt: 1,
              }}
            >
              <FormLabel>
                <Typography variant="subtitle2">Assinaturas Capuz</Typography>
              </FormLabel>
              <ControlledSwitch
                name="possuiAssinaturaMoletom"
                control={control}
                disabled={!possuiMoletom}
              />
            </FormControl>
          </Grid>

          <Grid item xs>
            <FormControl fullWidth size="small" sx={{ mt: 2 }}>
              <FormLabel sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2">
                  Nome Personalizado{" "}
                  <ControlledSwitch
                    name="possuiNomePersonalizadoMoletom"
                    control={control}
                    disabled={!possuiMoletom}
                  />
                </Typography>
              </FormLabel>
              <Controller
                name="nomePersonalizadoMoletom"
                control={control}
                defaultValue=""
                rules={{
                  required: possuiNomePersonalizadoMoletom
                    ? "Se selecionado, nome personalizado é obrigatório"
                    : false,
                }}
                disabled={!possuiNomePersonalizadoMoletom || !possuiMoletom}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.nomePersonalizadoMoletom}
                    helperText={errors.nomePersonalizadoMoletom?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider orientation="horizontal" />
          </Grid>

          <Grid item md={12} pt="4px !important">
            <MuiBox display="flex" justifyContent="space-between">
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                display="inline"
              >
                Caneca
              </Typography>

              <ControlledSwitch name="possuiCaneca" control={control} />
            </MuiBox>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl
              fullWidth
              size="small"
              sx={{ mt: 2 }}
              error={!!errors.corCaneca}
              disabled={!possuiCaneca}
            >
              <FormLabel sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2">Cor</Typography>
              </FormLabel>
              <Controller
                name="corCaneca"
                control={control}
                defaultValue=""
                rules={{
                  required: possuiCaneca ? "Selecione uma cor" : false,
                }}
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
                <FormHelperText>{errors.corCaneca.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl
              fullWidth
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                pt: 1,
              }}
            >
              <FormLabel>
                <Typography variant="subtitle2">Tirante</Typography>
              </FormLabel>
              <ControlledSwitch
                name="possuiTiranteCaneca"
                control={control}
                disabled={!possuiCaneca}
              />
            </FormControl>
          </Grid>
          <Grid item xs={0} md={6} />

          <Grid item xs>
            <FormControl fullWidth size="small" sx={{ mt: 2 }}>
              <FormLabel sx={{ mb: 0.5 }}>
                <Typography variant="subtitle2">
                  Nome Personalizado{" "}
                  <ControlledSwitch
                    name="possuiNomePersonalizadoCaneca"
                    control={control}
                    disabled={!possuiCaneca}
                  />
                </Typography>
              </FormLabel>
              <Controller
                name="nomePersonalizadoCaneca"
                control={control}
                defaultValue=""
                rules={{
                  required: possuiNomePersonalizadoCaneca
                    ? "Se selecionado, nome personalizado é obrigatório"
                    : false,
                }}
                disabled={!possuiNomePersonalizadoCaneca || !possuiCaneca}
                render={({ field }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.nomePersonalizadoCaneca}
                    helperText={errors.nomePersonalizadoCaneca?.message}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider orientation="horizontal" />
          </Grid>

          <Grid item xs={12}>
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              color="secondary"
              size="small"
              type="submit"
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditarAlunoModal;
