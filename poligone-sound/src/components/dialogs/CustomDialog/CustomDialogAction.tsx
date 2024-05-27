import React from "react";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { Button, DialogActions, Stack } from "@mui/material";
import { MouseEventHandler } from "react";

type Props = {
  onClose: () => void;
  onSubmit?: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
  loading?: boolean;
  color?: LoadingButtonProps["color"];
  type?: LoadingButtonProps["type"];
};

export const CustomDialogAction = ({
  onClose,
  onSubmit,
  buttonText,
  loading = false,
  color = "primary",
  type = "submit",
}: Props) => {
  return (
    <DialogActions sx={{ px: 3, py: 2 }}>
      <Stack direction="row" gap={2}>
        <Button variant="outlined" color="secondary" onClick={onClose} disabled={loading}>
          キャンセル
        </Button>
        <LoadingButton
          variant="contained"
          color={color}
          loading={loading}
          onClick={onSubmit}
          type={type}
          disabled={loading}
        >
          {buttonText}
        </LoadingButton>
      </Stack>
    </DialogActions>
  );
};
