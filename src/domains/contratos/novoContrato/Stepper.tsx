import { useState } from "react";

import { Box, Stepper, Step, StepButton } from "@mui/material";

import RepresentanteForm from "./form/Representantes/RepresentantesForm";
import ListaAlunosForm from "./form/ListaAlunos/ListaAlunosForm";

const stepComponents: Map<string, JSX.Element> = new Map([
  ["Detalhes Pedido", <RepresentanteForm />],
  ["Alunos", <ListaAlunosForm />],
]);

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = Array.from(stepComponents.keys());

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        style={{ marginBottom: "20px", width: "60%", justifySelf: "center" }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div>{stepComponents.get(steps[activeStep])}</div>
    </Box>
  );
}
