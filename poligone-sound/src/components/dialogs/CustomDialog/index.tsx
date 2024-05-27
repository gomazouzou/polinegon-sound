import React from "react";
import { Dialog, DialogProps, DialogTitle } from "@mui/material";

type Props = {
  open: boolean;
  onClose?: DialogProps["onClose"];
  title: string;
  maxWidth?: DialogProps["maxWidth"];
  children: React.ReactNode;
};

export const CustomDialog = ({ open, onClose, title, maxWidth = "sm", children }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
      <DialogTitle variant="body1" fontWeight="bold">
        {title}
      </DialogTitle>
      {children}
    </Dialog>
  );
};
