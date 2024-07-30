import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
  style: React.CSSProperties
}

export const PoligoneButton = ({onClick, style}: Props) => {
  return (
    <IconButton
      aria-label="poligone"
      onClick={onClick}
      style={{ ...style, borderRadius: "0" }}
    >
      <ChangeHistoryIcon style={{fontSize: '90px'}} />
    </IconButton>
  );
};
