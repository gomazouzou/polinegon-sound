import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
  disabled: boolean;
}

export const AddButton = ({onClick, disabled}: Props) => {
  return (
    <IconButton
      aria-label="add"
      onClick={onClick}
      disabled={disabled}
    >
      <AddIcon />
    </IconButton>
  );
};
