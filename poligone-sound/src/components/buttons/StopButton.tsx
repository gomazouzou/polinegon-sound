import StopIcon from '@mui/icons-material/Stop';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
  disabled: boolean;
}

export const StopButton = ({onClick, disabled}: Props) => {
  return (
    <IconButton
      aria-label="start"
      onClick={onClick}
      disabled={disabled}
    >
      <StopIcon />
    </IconButton>
  );
};
