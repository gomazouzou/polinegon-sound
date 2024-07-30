import PolylineIcon from '@mui/icons-material/Polyline';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
  disabled: boolean;
  startFigureDrawing: boolean;
}

export const StartDrawingButton = ({onClick, disabled, startFigureDrawing}: Props) => {
  return (
    <IconButton
      aria-label="start-drawing"
      onClick={onClick}
      disabled={disabled}
    >
      <PolylineIcon style={{ fontSize: '30px', color: startFigureDrawing ? 'black' : 'lightgray' }}/>
    </IconButton>
  );
};
