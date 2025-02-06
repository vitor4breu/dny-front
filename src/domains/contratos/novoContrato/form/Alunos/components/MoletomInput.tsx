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
import { HOODIE_GENDER, UNIFORM_SIZES } from "@utils/consts";
import { Aluno } from "domains/contratos/novoContrato/types";
import useFormStore from "../../formStore";

interface MoletomInputProps {
  aluno: Aluno;
  index: number;
}

const MoletomInput: React.FC<MoletomInputProps> = ({ aluno, index }) => {
  const [nomePersonalizado, setNomePersonalizado] = useState<boolean>(
    !!aluno.moletom?.nomePersonalizado
  );

  const updateAluno = useFormStore((state) => state.updateAluno);
  const detalhesPedido = useFormStore((state) => state.detalhesPedido);
  const coresMoletom = useFormStore((state) => state.coresMoletom);

  const handleNomePersonalizadoToggle = () => {
    setNomePersonalizado(!nomePersonalizado);
    if (!nomePersonalizado) {
      updateAluno(index, "moletom", {
        ...aluno.moletom,
        nomePersonalizado: "",
      });
    } else {
      const { nomePersonalizado, ...rest } = aluno.moletom || {};
      updateAluno(index, "moletom", rest);
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
            Moletom
          </Typography>

          <Button
            startIcon={<Delete />}
            onClick={() => updateAluno(index, "moletom", undefined)}
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
            value={aluno.moletom?.modelagem || ""}
            onChange={(e) =>
              updateAluno(index, "moletom", {
                ...aluno.moletom,
                modelagem: e.target.value,
              })
            }
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
      </Grid>
      <Grid item xs={12} md={!detalhesPedido.possuiNomePersonalizado ? 3 : 2}>
        <FormControl fullWidth>
          <FormLabel sx={{ mb: 0.5 }}>
            <Typography variant="subtitle2">Tamanho</Typography>
          </FormLabel>
          <Select
            fullWidth
            size="small"
            value={aluno.moletom?.tamanho || ""}
            onChange={(e) =>
              updateAluno(index, "moletom", {
                ...aluno.moletom,
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
            value={aluno.moletom?.idCor || ""}
            onChange={(e) =>
              updateAluno(index, "moletom", {
                ...aluno.moletom,
                cor: e.target.value,
              })
            }
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
      </Grid>
      {detalhesPedido.possuiAssinaturaCapuzMoletom && (
        <Grid item xs={12} md="auto">
          <FormControl fullWidth>
            <FormLabel sx={{ margin: "auto" }}>
              <Typography variant="subtitle2">Assinaturas Capuz</Typography>
            </FormLabel>
            <Tooltip
              title={
                aluno.moletom?.assinaturaCapuz
                  ? "Remover assinatura capuz"
                  : "Adicionar assinatura capuz"
              }
            >
              <Switch
                sx={{ margin: "auto" }}
                checked={aluno.moletom?.assinaturaCapuz}
                onChange={(e) =>
                  updateAluno(index, "moletom", {
                    ...aluno.moletom,
                    assinaturaCapuz: e.target.checked,
                  })
                }
                color="primary"
              />
            </Tooltip>
          </FormControl>
        </Grid>
      )}
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
              value={aluno.moletom?.nomePersonalizado || ""}
              onChange={(e) =>
                updateAluno(index, "moletom", {
                  ...aluno.moletom,
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

export default MoletomInput;
