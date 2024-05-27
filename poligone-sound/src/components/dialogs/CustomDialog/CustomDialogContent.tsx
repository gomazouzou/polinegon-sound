import React from "react";
import { DialogContent } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

export const CustomDialogContent = ({ children }: Props) => {
  return <DialogContent dividers>{children}</DialogContent>;
};
