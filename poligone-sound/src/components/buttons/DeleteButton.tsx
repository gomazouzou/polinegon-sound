import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
  disabled: boolean;
}

export const DeleteButton = ({onClick, disabled}: Props) => {
  return (
    <IconButton
      aria-label="delete"
      onClick={onClick}
      disabled={disabled}
    >
      <RemoveIcon />
    </IconButton>
  );
};
