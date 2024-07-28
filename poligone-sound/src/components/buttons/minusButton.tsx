import React from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton} from "@mui/material";

type Props = {
  onClick: () => void;
}

export const MinusButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="minus"
      onClick={onClick}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};