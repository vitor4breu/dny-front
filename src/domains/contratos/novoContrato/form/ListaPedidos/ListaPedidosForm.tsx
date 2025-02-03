import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Modal,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import useNewFormStore from "../newFormStore"; // Pegando a store do Zustand
import AlunoInput from "../Alunos/components/AlunoInput";

const ListaPedidos = () => {
  const [modal, setModal] = useState(false);
  const alunos = useNewFormStore((state) => state.alunos);
  const pedido = useNewFormStore((state) => state.pedido);

  return (
    <>
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {alunos.map((aluno) => (
          <Card sx={{ position: "relative", p: 2 }}>
            <CardHeader
              title={aluno.nome}
              subheader={`Sexo: ${aluno.sexo}`}
              action={
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() => setModal(true)}
                >
                  Editar
                </Button>
              }
            />
            <CardContent>
              <Typography variant="body2">
                Camiseta:{" "}
                {pedido.camisa.possui ? pedido.camisa.cor : "Não possui"}
              </Typography>
              <Typography variant="body2">
                Moletom:{" "}
                {pedido.moletom.possui ? pedido.moletom.cor : "Não possui"}
              </Typography>
              <Typography variant="body2">
                Caneca: {pedido.caneca.possui ? "Sim" : "Não"}{" "}
                {pedido.caneca.tirante ? "(com tirante)" : ""}
              </Typography>
              <Typography variant="body2">
                Bandeira: {pedido.bandeira.possui ? "Sim" : "Não"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
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
          <AlunoInput key={1} index={1} />
        </Box>
      </Modal>
    </>
  );
};

export default ListaPedidos;
