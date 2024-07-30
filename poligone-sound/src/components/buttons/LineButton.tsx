import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import { IconButton } from "@mui/material";
import React from "react";

type Props = {
  onClick: () => void;
  style: React.CSSProperties
}

export const LineButton = ({onClick, style}: Props) => {
  return (
    <IconButton
      aria-label="line"
      onClick={onClick}
      style={{ ...style, borderRadius: "0" }}
    >
      <MultilineChartIcon style={{fontSize: '90px'}} />
    </IconButton>
  );
};
