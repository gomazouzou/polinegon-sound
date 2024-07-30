import PolylineIcon from '@mui/icons-material/Polyline';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
  disabled: boolean;
  isFreeFigureDrawing: boolean;
}

export const FreeDrawingButton = ({onClick, disabled, isFreeFigureDrawing}: Props) => {
  return (
    <IconButton
      aria-label="free-drawing"
      onClick={onClick}
      disabled={disabled}
    >
      <PolylineIcon style={{ fontSize: '30px', color: isFreeFigureDrawing ? 'black' : 'lightgray' }}/>
    </IconButton>
  );
};
