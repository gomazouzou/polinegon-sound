import CircleIcon from '@mui/icons-material/Circle';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  color: string;
  setPenColor: (color:string) => void;
  style: React.CSSProperties;
}

export const ColorButton = ({color, setPenColor, style}: Props) => {
  const onClick = () => {
    setPenColor(color);
  }
  return (
    <IconButton
      aria-label="add"
      onClick={onClick}
      style={style}
    >
      <CircleIcon style={{ fontSize: '30px', color: color }}/>
    </IconButton>
  );
};
