import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
}

export const StartButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="start"
      onClick={onClick}
    >
      <PlayCircleFilledWhiteIcon />
    </IconButton>
  );
};
