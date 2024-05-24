import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button, CircularProgress} from "@mui/material";

type Props = {
  text?: string;
  onClick?: () => void;
  variant?: "text" | "contained" | "outlined";
  disabled?: boolean;
  loading?: boolean;
};

export const PlusButton = ({
  onClick,
  variant = "contained",
  disabled = false,
  loading = false,
}: Props) => {
  return (
    <Button
      variant={variant}
      disabled={disabled || loading}
      color="primary"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        cursor: "pointer",
      }}
      onClick={onClick}
      startIcon={loading ? <CircularProgress size="14px" /> : <AddOutlinedIcon />}
    >
    </Button>
  );
};
