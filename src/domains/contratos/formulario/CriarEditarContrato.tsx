import { useState } from "react";

import { Grid } from "@mui/material";
import { Box, Stepper, Step, StepButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PedidosForm from "./form/PedidosForm";
import AlunosCard from "./form/AlunosCard";

const CriarEditarContrato = () => {
  const navigate = useNavigate();
  const { pedidoId } = useParams<{ pedidoId: string }>();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Detalhes Pedido", "Alunos"];

  const handleStep = (step: number) => () => {
    if (step === 1 && !pedidoId) {
      return;
    }
    setActiveStep(step);
  };

  const handlePedidoSalvo = (id: string) => {
    navigate(`${id}`);
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
              <PedidosForm
                onPedidoSalvo={handlePedidoSalvo}
                pedidoId={pedidoId}
              />
            )}
            {activeStep === 1 && <AlunosCard pedidoId={pedidoId} />}
          </div>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CriarEditarContrato;
