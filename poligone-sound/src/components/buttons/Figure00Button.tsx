import { Button } from "@mui/material";
import React from "react";
import Figure00 from '../../images/figure_templete_00.png';

type Props = {
  onClick: () => void;
  style: React.CSSProperties;
  disabled: boolean;
}

export const Figure00Button = ({onClick, style, disabled}: Props) => {
  return (
    <Button
      startIcon={<img src={Figure00} alt="myImage" style={{ width: 80, height: 80 }} />} 
      onClick={onClick}
      style={style}
      disabled={disabled}
    />
  );
};
