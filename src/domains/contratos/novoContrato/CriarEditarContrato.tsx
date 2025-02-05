import { Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";

import SubmitForm from "./form/Submit";
import HorizontalNonLinearStepper from "./Stepper";

const CriarEditarContrato = () => {
  return (
    <Grid container spacing={3} width="100%">
      <ToastContainer />
      <Grid item xs={12}>
        <HorizontalNonLinearStepper />
      </Grid>

      <Grid item xs={12}>
        <SubmitForm />
      </Grid>
    </Grid>
  );
};

export default CriarEditarContrato;
