import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { IconButton} from "@mui/material";


type Props = {
  onClick: () => void;
  isVisible: boolean;
  color: string;
}

export const VisibleButton = ({onClick, isVisible, color}: Props) => {
  return (
    <IconButton
      aria-label="add"
      onClick={onClick}
    >
      {
        isVisible ? (
          <VisibilityIcon  style={{ fontSize: '24px', color: color}}/>
        ) : (
          <VisibilityOffIcon  style={{ fontSize: '24px', color: color}}/>
        )
      }
    </IconButton>
  );
};
