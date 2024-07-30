import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from "@mui/material";
import React, { useRef } from "react";

type Props = {
  onLongPress: () => void;
  disabled: boolean;
}

export const PlusButton = ({onLongPress, disabled}: Props) => {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleMouseDown = () => {
    timerRef.current = setInterval(onLongPress, 100);
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  return (
    <IconButton
      aria-label="plus"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      disabled={disabled}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
};
