import React from "react";
import AddIcon from '@mui/icons-material/Add';
import { IconButton} from "@mui/material";

type Props = {
  onClick: () => void;
}

export const AddButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="add"
      onClick={onClick}
    >
      <AddIcon />
    </IconButton>
  );
};
