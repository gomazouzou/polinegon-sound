import React from "react";
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { IconButton } from "@mui/material";

type Props = {
  onClick: () => void;
}

export const PoligoneButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="poligone"
      onClick={onClick}
    >
      <ChangeHistoryIcon style={{fontSize: '90px'}} />
    </IconButton>
  );
};
