import { Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";

import HorizontalNonLinearStepper from "./Stepper";

const CriarEditarContrato = () => {
  return (
    <Grid container spacing={3} width="100%">
      <ToastContainer />
      <Grid item xs={12}>
        <HorizontalNonLinearStepper />
      </Grid>
    </Grid>
  );
};

export default CriarEditarContrato;
