import { useState, useEffect } from "react";

import { Grid } from "@mui/material";
import { Box, Stepper, Step, StepButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PedidosForm from "./form/PedidosForm";
import AlunosCard from "./form/AlunosCard";

const CriarEditarContrato = () => {
  const navigate = useNavigate();
  const { pedidoId } = useParams<{ pedidoId: string }>(); // Pegando o ID da URL
  const [activeStep, setActiveStep] = useState(0);
  const [pedidoID, setPedidoID] = useState<string | null>(pedidoId || null);
  const steps = ["Detalhes Pedido", "Alunos"];

  useEffect(() => {
    if (pedidoId) {
      setPedidoID(pedidoId); // Atualiza o estado se vier um ID na URL
    }
  }, [pedidoId]);

  const handleStep = (step: number) => () => {
    // Impede navegação para "Alunos" sem um pedidoID válido
    if (step === 1 && !pedidoID) {
      return;
    }
    setActiveStep(step);
  };

  const handlePedidoSalvo = (id: string) => {
    //TODO: if se cria ou atualiza
    setPedidoID(id);
    navigate(`${id}`); // Atualiza a URL com o ID
    setActiveStep(1);
  };

  return (
    <Grid container spacing={3} width="100%">
      <ToastContainer />
      <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <Stepper
            nonLinear
            activeStep={activeStep}
            style={{
              marginBottom: "20px",
              width: "60%",
              justifySelf: "center",
            }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>

          <div>
            {activeStep === 0 && (
              <PedidosForm onPedidoSalvo={handlePedidoSalvo} />
            )}
            {activeStep === 1 && <AlunosCard pedidoId={pedidoID} />}
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CriarEditarContrato;
