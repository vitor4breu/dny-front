import React, { useEffect } from "react";

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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";

import Box from "@components/@extended/Box";
import { ControlledSwitch } from "@components/@extended/ControlledSwitch";
import useFormStore from "../formStore";
import ContratosService from "services/contratoService";
import { formInitalState, IForm } from "../../types/formTypes";
import { HOODIE_GENDER, UNIFORM_GENDER, UNIFORM_SIZES } from "@utils/consts";
import { Aluno } from "../../types";

interface IProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DetalhesPedidoForm = ({ setModal }: IProps) => {
  const coresCamisa = useFormStore((state) => state.coresCamisa);
  const coresMoletom = useFormStore((state) => state.coresMoletom);

  const addAluno = useFormStore((state) => state.addAluno);

  const setCoresMoletom = useFormStore(
    useShallow((state) => state.setCoresMoletom)
  );
  const setCoresCamisa = useFormStore(
    useShallow((state) => state.setCoresCamisa)
  );

  useEffect(() => {
    ContratosService.ObterCoresCamisa().then(setCoresCamisa);
    ContratosService.ObterCoresMoletom().then(setCoresMoletom);
  }, []);

  const { register, handleSubmit, setValue, watch, control } = useForm({
    defaultValues: formInitalState,
  });

  const onSubmit = (data: IForm) => {
    console.log(data);
    if (data.nomeAluno.trim() === "") return;

    const aluno: Aluno = {
      nome: data.nomeAluno,
      ...(data.possuiCamiseta && {
        camisa: {
          tamanho: +data.tamanhoCamiseta,
          modelagem: +data.modeloCamiseta,
          idCor: +data.corCamiseta,
          nomePersonalizado: data.nomePersonalizadoCamisa,
        },
      }),
      ...(data.possuiMoletom && {
        moletom: {
          tamanho: +data.tamanhoMoletom,
          modelagem: +data.modeloMoletom,
          idCor: +data.corMoletom, // Corrigi para `corMoletom` caso seja um erro de referência
          assinaturaCapuz: data.possuiAssinaturaMoletom,
          nomePersonalizado: data.nomePersonalizadoMoletom,
        },
      }),
      ...(data.possuiCaneca && {
        caneca: {
          nomePersonalizado: data.nomePersonalizadoCaneca,
          tirante: data.possuiTiranteCaneca,
        },
      }),
    };

    addAluno(aluno);

    setValue("nomeAluno", "");
  };

  const onPersonalizar = (data: IForm) => {
    console.log(data);
    if (data.nomeAluno.trim() === "") return;

    const aluno: Aluno = {
      nome: data.nomeAluno,
      ...(data.possuiCamiseta && {
        camisa: {
          tamanho: +data.tamanhoCamiseta,
          modelagem: +data.modeloCamiseta,
          idCor: +data.corCamiseta,
          nomePersonalizado: data.nomePersonalizadoCamisa,
        },
      }),
      ...(data.possuiMoletom && {
        moletom: {
          tamanho: +data.tamanhoMoletom,
          modelagem: +data.modeloMoletom,
          idCor: +data.corMoletom, // Corrigi para `corMoletom` caso seja um erro de referência
          assinaturaCapuz: data.possuiAssinaturaMoletom,
          nomePersonalizado: data.nomePersonalizadoMoletom,
        },
      }),
      ...(data.possuiCaneca && {
        caneca: {
          nomePersonalizado: data.nomePersonalizadoCaneca,
          tirante: data.possuiTiranteCaneca,
        },
      }),
    };

    addAluno(aluno);

    setModal(true);
    setValue("nomeAluno", "");
  };

  const possuiCamiseta = watch("possuiCamiseta");
  const possuiMoletom = watch("possuiMoletom");
  const possuiCaneca = watch("possuiCaneca");

  return (
    <Box
      title="Assistente de preenchimento rápido"
      titleProps={{ variant: "subtitle1", fontFamily: "inter" }}
      sx={{ mb: 2 }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mt: 2, minHeight: "300px" }}>
          <Grid item md={12} lg={3.8}>
            <Typography variant="h6">
              Camiseta{" "}
              <ControlledSwitch name="possuiCamiseta" control={control} />
            </Typography>

            {possuiCamiseta && (
              <>
                <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                  <Select
                    {...register("modeloCamiseta")}
                    fullWidth
                    size="small"
                    defaultValue=""
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      <em>Selecione o modelo</em>
                    </MenuItem>
                    {UNIFORM_GENDER.map((gender) => (
                      <MenuItem key={gender.value} value={gender.value}>
                        {gender.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                  <Select
                    {...register("tamanhoCamiseta")}
                    fullWidth
                    size="small"
                    defaultValue=""
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      <em>Selecione o tamanho</em>
                    </MenuItem>
                    {UNIFORM_SIZES.map((size) => (
                      <MenuItem key={size.value} value={size.value}>
                        {size.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                  <Select
                    {...register("corCamiseta")}
                    fullWidth
                    size="small"
                    defaultValue=""
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
                <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                  <Select
                    {...register("modeloMoletom")}
                    fullWidth
                    size="small"
                    defaultValue=""
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      <em>Selecione o modelo</em>
                    </MenuItem>
                    {HOODIE_GENDER.map((gender) => (
                      <MenuItem key={gender.value} value={gender.value}>
                        {gender.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                  <Select
                    {...register("tamanhoMoletom")}
                    fullWidth
                    size="small"
                    defaultValue=""
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      <em>Selecione o tamanho</em>
                    </MenuItem>
                    {UNIFORM_SIZES.map((size) => (
                      <MenuItem key={size.value} value={size.value}>
                        {size.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ mt: 2 }}>
                  <Select
                    {...register("corMoletom")}
                    fullWidth
                    size="small"
                    defaultValue=""
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
              Caneca <ControlledSwitch name="possuiCaneca" control={control} />
            </Typography>

            {possuiCaneca && (
              <ControlledSwitch
                name="possuiTiranteCaneca"
                control={control}
                label="Adicionar Tirante"
              />
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
              {...register("nomeAluno")}
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
                onClick={() => onPersonalizar(watch())}
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
    </Box>
  );
};

export default DetalhesPedidoForm;
