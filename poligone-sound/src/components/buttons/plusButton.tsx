import React from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton} from "@mui/material";

type Props = {
  onClick: () => void;
}

export const PlusButton = ({onClick}: Props) => {
  return (
    <IconButton
      onClick = {onClick}
      aria-label="plus"
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};
