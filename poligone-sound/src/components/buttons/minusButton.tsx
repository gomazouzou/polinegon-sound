import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from "@mui/material";
import React, { useRef } from "react";

type Props = {
  onLongPress: () => void;
}

export const MinusButton = ({onLongPress}: Props) => {
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
      aria-label="minus"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
};
