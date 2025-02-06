import React, { useState } from "react";
import {
  Grid,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  Typography,
  Box as MuiBox,
  Switch,
  Tooltip,
  Button,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { UNIFORM_GENDER, UNIFORM_SIZES } from "@utils/consts";
import { Aluno } from "domains/contratos/novoContrato/types";
import useFormStore from "../../formStore";

interface CamisaInputProps {
  aluno: Aluno;
  index: number;
}

const CamisaInput: React.FC<CamisaInputProps> = ({ aluno, index }) => {
  const updateAluno = useFormStore((state) => state.updateAluno);
  const detalhesPedido = useFormStore((state) => state.detalhesPedido);
  const coresCamisa = useFormStore((state) => state.coresCamisa);

  const [nomePersonalizado, setNomePersonalizado] = useState<boolean>(
    !!aluno.camisa?.nomePersonalizado
  );

  const handleNomePersonalizadoToggle = () => {
    setNomePersonalizado(!nomePersonalizado);
    if (!nomePersonalizado) {
      updateAluno(index, "camisa", { ...aluno.camisa, nomePersonalizado: "" });
    } else {
      const { nomePersonalizado, ...rest } = aluno.camisa || {};
      updateAluno(index, "camisa", rest);
    }
  };

  return (
    <>
      <Grid item md={12} pt="4px !important">
        <MuiBox display="flex" justifyContent="space-between">
          <Typography
            variant="subtitle1"
            fontWeight={"bold"}
            display={"inline"}
          >
            {" "}
            Camisa
          </Typography>

          <Button
            startIcon={<Delete />}
            onClick={() => updateAluno(index, "camisa", undefined)}
            sx={{
              fontWeight: "bold",
              letterSpacing: "0.02857em",
              color: "#f35955",
              paddingBottom: 0,
            }}
            size="small"
          >
            Remover
          </Button>
        </MuiBox>
      </Grid>
      <Grid item xs={12} md>
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 0.5 }}>
            <Typography variant="subtitle2">Modelo</Typography>
          </FormLabel>
          <Select
            fullWidth
            size="small"
            value={aluno.camisa?.modelagem || ""}
            onChange={(e) =>
              updateAluno(index, "camisa", {
                ...aluno.camisa,
                modelagem: e.target.value,
              })
            }
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
      </Grid>
      <Grid item xs={12} md={!detalhesPedido.possuiNomePersonalizado ? 3 : 2}>
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 0.5 }}>
            <Typography variant="subtitle2">Tamanho</Typography>
          </FormLabel>
          <Select
            fullWidth
            size="small"
            value={aluno.camisa?.tamanho || ""}
            onChange={(e) =>
              updateAluno(index, "camisa", {
                ...aluno.camisa,
                tamanho: e.target.value,
              })
            }
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
      </Grid>
      <Grid item xs={12} md={3}>
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 0.5 }}>
            <Typography variant="subtitle2">Cor</Typography>
          </FormLabel>
          <Select
            fullWidth
            size="small"
            value={aluno.camisa?.idCor || ""}
            onChange={(e) =>
              updateAluno(index, "camisa", {
                ...aluno.camisa,
                cor: e.target.value,
              })
            }
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
      </Grid>
      {detalhesPedido.possuiNomePersonalizado && (
        <Grid item xs={12} md="auto">
          <FormControl fullWidth>
            <FormLabel sx={{ margin: "auto" }}>
              <Typography variant="subtitle2">Nome Personalizado</Typography>
            </FormLabel>
            <Tooltip
              title={
                nomePersonalizado
                  ? "Remover nome personalizado"
                  : "Adicionar nome personalizado"
              }
            >
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
      {detalhesPedido.possuiNomePersonalizado && nomePersonalizado && (
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormLabel sx={{ mb: 0.5 }}>
              <Typography variant="subtitle2">Nome Personalizado</Typography>
            </FormLabel>
            <TextField
              fullWidth
              size="small"
              placeholder="Digite o nome personalizado"
              value={aluno.camisa?.nomePersonalizado || ""}
              onChange={(e) =>
                updateAluno(index, "camisa", {
                  ...aluno.camisa,
                  nomePersonalizado: e.target.value,
                })
              }
            />
          </FormControl>
        </Grid>
      )}
    </>
  );
};

export default CamisaInput;
