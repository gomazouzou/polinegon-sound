import PolylineIcon from '@mui/icons-material/Polyline';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
  disabled: boolean;
  clickFigureDrawing: boolean;
}

export const StartDrawingButton = ({onClick, disabled, clickFigureDrawing}: Props) => {
  return (
    <IconButton
      aria-label="start-drawing"
      onClick={onClick}
      disabled={disabled}
    >
      <PolylineIcon style={{ fontSize: '30px', color: clickFigureDrawing ? 'black' : 'lightgray' }}/>
    </IconButton>
  );
};
