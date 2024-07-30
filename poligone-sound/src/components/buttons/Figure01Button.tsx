import { Button } from "@mui/material";
import { default as React } from "react";
import Figure01 from '../../images/figure_templete_01.png';

type Props = {
  onClick: () => void;
  style: React.CSSProperties;
  disabled: boolean;
}

export const Figure01Button = ({onClick, style, disabled}: Props) => {
  return (
    <Button
      startIcon={<img src={Figure01} alt="myImage" style={{ width: 80, height: 80 }} />}
      onClick={onClick}
      style={style}
      disabled={disabled}
    />
  );
};
