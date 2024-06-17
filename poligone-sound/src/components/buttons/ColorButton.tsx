import React from "react";
import CircleIcon from '@mui/icons-material/Circle';
import { IconButton} from "@mui/material";

type Props = {
  color: string;
  setPenColor: (color:string) => void;
}

export const ColorButton = ({color, setPenColor}: Props) => {
  const onClick = () => {
    setPenColor(color);
  }
  return (
    <IconButton
      aria-label="add"
      onClick={onClick}
    >
      <CircleIcon style={{ fontSize: '30px', color: color }}/>
    </IconButton>
  );
};
