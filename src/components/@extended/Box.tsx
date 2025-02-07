import { BoxProps, Typography, TypographyProps } from "@mui/material";
import MuiBox from "@mui/material/Box";

export interface Props extends BoxProps {
  title?: string;
  titleProps?: TypographyProps;
  childrenBoxProps?: BoxProps;
}

export default function Box({
  title,
  titleProps,
  childrenBoxProps,
  children,
  ...others
}: Props) {
  return (
    <MuiBox
      border={1}
      borderColor="grey.300"
      borderRadius={1}
      bgcolor="white"
      {...others}
    >
      {title && (
        <Typography
          borderBottom="1px solid lightgrey"
          padding="5px 20px"
          {...titleProps}
        >
          {title}
        </Typography>
      )}
      <MuiBox {...childrenBoxProps} padding="12px 20px">
        {children}
      </MuiBox>
    </MuiBox>
  );
}
