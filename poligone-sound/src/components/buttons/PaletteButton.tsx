import React from "react";
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { green } from "@mui/material/colors";
import { IconButton} from "@mui/material";

type Props = {
  onClick?: () => void;
  color: string
}

export const PaletteButton = ({onClick, color}: Props) => {
  return (
    <IconButton
      aria-label="palette"
      onClick={onClick}
    >
      <ColorLensIcon style={{ fontSize: '45px', color:color }}/>
    </IconButton>
  );
};
