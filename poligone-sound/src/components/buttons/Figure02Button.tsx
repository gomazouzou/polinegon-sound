import { Button } from "@mui/material";
import React from "react";
import Figure02 from '../../images/figure_templete_02.png';

type Props = {
  onClick: () => void;
  style: React.CSSProperties;
}

export const Figure02Button = ({onClick, style}: Props) => {
  return (
    <Button
      startIcon={<img src={Figure02} alt="myImage" style={{ width: 80, height: 80 }} />}
      onClick={onClick}
      style={style}
    />
  );
};
