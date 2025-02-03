import { useState } from "react";
import Box from "@components/@extended/Box";
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useNewFormStore from "../newFormStore";

const ListaAlunosForm = () => {
  const [nomeAluno, setNomeAluno] = useState<string>("");
  const [sexo, setSexo] = useState<"M" | "F">("M");

  // Zustand store
  const alunos = useNewFormStore((state) => state.alunos);
  const addAluno = useNewFormStore((state) => state.addAluno);

  // Alternar seleção de gênero
  const handleSexoChange = (selectedSexo: "M" | "F") => {
    setSexo(selectedSexo);
  };

  // Adicionar aluno à lista
  const handleAddAluno = () => {
    if (nomeAluno.trim() === "") return;
    addAluno({ nome: nomeAluno, sexo });
    setNomeAluno(""); // Resetar campo
  };

  return (
    <Box
      title={`Quantidade de Alunos: ${alunos.length}`}
      titleProps={{ variant: "subtitle1", fontFamily: "inter" }}
    >
      {/* Nome do aluno */}
      <TextField
        label="Nome do Aluno"
        value={nomeAluno}
        onChange={(e) => setNomeAluno(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      {/* Checkboxes para gênero */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={sexo === "M"}
              onChange={() => handleSexoChange("M")}
            />
          }
          label="Masculino"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sexo === "F"}
              onChange={() => handleSexoChange("F")}
            />
          }
          label="Feminino"
        />
      </div>

      {/* Botão de adicionar */}
      <Button
        startIcon={<AddIcon />}
        onClick={handleAddAluno}
        size="small"
        variant="contained"
        color="secondary"
      >
        Adicionar Aluno
      </Button>

      {/* Tabela de alunos adicionados */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nome</strong>
              </TableCell>
              <TableCell>
                <strong>Sexo</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {alunos?.map((aluno, index) => (
              <TableRow key={index}>
                <TableCell>{aluno.nome}</TableCell>
                <TableCell>
                  {aluno.sexo === "M" ? "Masculino" : "Feminino"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListaAlunosForm;
