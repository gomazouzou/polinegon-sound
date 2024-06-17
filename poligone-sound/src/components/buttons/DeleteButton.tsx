import React from "react";
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton} from "@mui/material";

type Props = {
  onClick: () => void;
}

export const DeleteButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="delete"
      onClick={onClick}
    >
      <RemoveIcon />
    </IconButton>
  );
};
