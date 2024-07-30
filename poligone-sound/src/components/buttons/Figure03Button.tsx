import { Button } from "@mui/material";
import React from "react";
import Figure03 from '../../images/figure_templete_03.png';

type Props = {
  onClick: () => void;
  style: React.CSSProperties;
}

export const Figure03Button = ({onClick, style}: Props) => {
  return (
    <Button
      startIcon={<img src={Figure03} alt="myImage" style={{ width: 80, height: 80 }} />}
      onClick={onClick}
      style={style}
    />
  );
};
