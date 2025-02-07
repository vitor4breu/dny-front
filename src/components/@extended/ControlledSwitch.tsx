import React from "react";

import { FormControlLabel, Switch } from "@mui/material";
import { useController } from "react-hook-form";

interface IProps {
  name: string;
  control: any;
  label?: string;
  disabled?: boolean;
}

export const ControlledSwitch = React.memo(
  ({ name, control, label, disabled = false }: IProps) => {
    const { field } = useController({
      name,
      control,
      defaultValue: false, // Valor padrão do switch
    });

    return label ? (
      <FormControlLabel
        control={
          <Switch
            checked={field.value}
            onChange={field.onChange}
            color="primary"
          />
        }
        label={label}
        sx={{ mt: 2 }}
      />
    ) : (
      <Switch
        checked={field.value}
        onChange={field.onChange}
        color="primary"
        disabled={disabled}
      />
    );
  }
);
