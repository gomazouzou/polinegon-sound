import React from "react";
import { RiEraserFill } from "react-icons/ri";
import { IconButton} from "@mui/material";

type Props = {
  onClick: () => void;
}

export const EraserButton = ({onClick}: Props) => {
  return (
    <IconButton
      aria-label="eraser"
      onClick={onClick}
    >
      <RiEraserFill style={{ fontSize: '30px' }}/>
    </IconButton>
  );
};
