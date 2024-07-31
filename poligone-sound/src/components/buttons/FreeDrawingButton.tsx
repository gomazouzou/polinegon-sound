import PolylineIcon from '@mui/icons-material/Polyline';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
  style: React.CSSProperties;
}

export const FreeDrawingButton = ({onClick, style}: Props) => {
  return (
    <IconButton
      aria-label="free-drawing"
      onClick={onClick}
      style={{ ...style, borderRadius: "0" }}
    >
      <PolylineIcon style={{ fontSize: '90px' }}/>
    </IconButton>
  );
};
