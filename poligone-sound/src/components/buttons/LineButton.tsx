import React from "react";
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import { IconButton } from "@mui/material";

type Props = {
  onClick: () => void;
}

export const LineButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="line"
      onClick={onClick}
    >
      <MultilineChartIcon style={{fontSize: '90px'}} />
    </IconButton>
  );
};
