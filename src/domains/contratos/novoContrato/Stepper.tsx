import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import RepresentanteForm from "./form/Representantes/RepresentantesForm";
import DeliveryForm from "./form/Envio/EnvioForm";
import DetalhesPedidoForm from "./form/Pedido/PedidoForm";
import AlunosForm from "./form/Alunos/AlunosForm";
import ListaAlunosForm from "./form/ListaAlunos/ListaAlunosForm";
import ListaPedidos from "./form/ListaPedidos/ListaPedidosForm";

const stepComponents: Map<string, JSX.Element> = new Map([
  ["Representantes", <RepresentanteForm />],
  ["Pedido", <DetalhesPedidoForm />],
  ["Quantidade", <ListaAlunosForm />],
  ["Alunos", <ListaPedidos />],
  ["Entrega", <DeliveryForm />],
]);

export default function HorizontalNonLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const steps = Array.from(stepComponents.keys());

  const totalSteps = () => {
    return stepComponents.size;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        style={{ marginBottom: "20px" }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div>
        <>
          {stepComponents.get(steps[activeStep])}
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </Button>
            {activeStep !== steps.length &&
              (completed[activeStep] ? (
                <Typography variant="caption" sx={{ display: "inline-block" }}>
                  Step {activeStep + 1} already completed
                </Typography>
              ) : (
                <Button onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1
                    ? "Finish"
                    : "Complete Step"}
                </Button>
              ))}
          </Box>
        </>
      </div>
    </Box>
  );
}
