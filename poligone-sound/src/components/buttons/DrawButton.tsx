import React from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton} from "@mui/material";

type Props = {
  onClick: () => void;
}

export const DrawButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="draw"
      onClick={onClick}
    >
      <ModeEditIcon style={{ fontSize: '30px' }}/>
    </IconButton>
  );
};
