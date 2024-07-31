import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
  disabled: boolean;
}

export const StartButton = ({onClick, disabled}: Props) => {
  return (
    <IconButton
      aria-label="start"
      onClick={onClick}
      disabled={disabled}
    >
      <PlayCircleFilledWhiteIcon />
    </IconButton>
  );
};
