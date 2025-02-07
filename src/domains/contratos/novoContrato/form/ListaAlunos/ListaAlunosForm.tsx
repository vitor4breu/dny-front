import { useState } from "react";

import {
  Button,
  CardContent,
  Typography,
  Card,
  CardHeader,
  Modal,
  Stack,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Box from "@components/@extended/Box";
import { UNIFORM_SIZES, UNIFORM_GENDER, HOODIE_GENDER } from "@utils/consts";
import DetalhesPedidoForm from "../Pedido/PedidoForm";
import useFormStore from "../formStore";
import { Aluno } from "../../types";
import AlunoModal from "../Alunos/AlunoModal";

const getLabel = (list: any, value: any) => {
  const item = list.find((i: any) => i.value === value);
  return item ? item.label : "Desconhecido";
};

const getColor = (list: any[], value: any) => {
  const color = list.find((i: any) => i.id === value);
  return color ? color.nome : "Desconhecido";
};

const ListaAlunosForm = () => {
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  // Zustand store
  const alunos = useFormStore((state) => state.alunos);
  const coresMoletom = useFormStore((state) => state.coresMoletom);
  const coresCamisa = useFormStore((state) => state.coresCamisa);
  const { setSelectedItem } = useFormStore();

  const handleEdit = (index: number, aluno: Aluno) => {
    setSelectedItem(index, aluno);
    setModal(true);
  };

  return (
    <>
      <DetalhesPedidoForm openModal={openModal} />

      {alunos.length > 0 && (
        <Box
          title={`Quantidade de Alunos: ${alunos.length}`}
          titleProps={{ variant: "subtitle1", fontFamily: "inter" }}
        >
          <div
            style={{
              display: "grid",
              gap: "24px",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            }}
          >
            {alunos.map((aluno: Aluno, index: number) => (
              <Card
                key={index}
                sx={{
                  position: "relative",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 220,
                }}
              >
                <CardHeader title={aluno.nome} sx={{ pb: 1 }} />
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
                    <Divider />
                    <Typography variant="body2">
                      <strong>Camiseta:</strong>{" "}
                      {aluno.camisa
                        ? `${getLabel(
                            UNIFORM_SIZES,
                            aluno.camisa.tamanho
                          )}, ${getLabel(
                            UNIFORM_GENDER,
                            aluno.camisa.modelagem
                          )}, ${getColor(coresCamisa, aluno.camisa.idCor)} ${
                            aluno.camisa.nomePersonalizado
                              ? `(${aluno.camisa.nomePersonalizado})`
                              : ""
                          }`
                        : "Não possui"}
                    </Typography>
                    <Divider />
                    <Typography variant="body2">
                      <strong>Moletom:</strong>{" "}
                      {aluno.moletom
                        ? `${getLabel(
                            UNIFORM_SIZES,
                            aluno.moletom.tamanho
                          )}, ${getLabel(
                            HOODIE_GENDER,
                            aluno.moletom.modelagem
                          )}, ${getColor(coresMoletom, aluno.moletom.idCor)} ${
                            aluno.moletom.assinaturaCapuz
                              ? "(com assinatura)"
                              : ""
                          } ${
                            aluno.moletom.nomePersonalizado
                              ? `(${aluno.moletom.nomePersonalizado})`
                              : ""
                          }`
                        : "Não possui"}
                    </Typography>
                    <Divider />
                    <Typography variant="body2">
                      <strong>Caneca:</strong>{" "}
                      {aluno.caneca
                        ? `Sim ${aluno.caneca.tirante ? "(com tirante)" : ""} ${
                            aluno.caneca.nomePersonalizado
                              ? `(${aluno.caneca.nomePersonalizado})`
                              : ""
                          }`
                        : "Não possui"}
                    </Typography>
                    <Divider />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={2}
                    mt={2}
                    justifyContent="center"
                  >
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(index, aluno)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      startIcon={<DeleteIcon />}
                      variant="contained"
                      color="secondary"
                      disabled
                    >
                      Remover
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </div>
        </Box>
      )}
      <Modal open={modal} onClose={() => setModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
          }}
        >
          <AlunoModal closeModal={closeModal} />
        </Box>
      </Modal>
    </>
  );
};

export default ListaAlunosForm;
