import React from "react";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { IconButton} from "@mui/material";

type Props = {
  onClick?: () => void;
}

export const ColorButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="color"
      onClick={onClick}
    >
      <ColorLensIcon style={{ fontSize: '45px' }}/>
    </IconButton>
  );
};
