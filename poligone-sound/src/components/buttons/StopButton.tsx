import StopIcon from '@mui/icons-material/Stop';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
}

export const StopButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="start"
      onClick={onClick}
    >
      <StopIcon />
    </IconButton>
  );
};
