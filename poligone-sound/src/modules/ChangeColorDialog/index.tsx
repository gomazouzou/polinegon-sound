import React from "react";
import { Stack } from "@mui/material";
import { ColorButton } from "../../components/buttons/ColorButton.tsx";

type Props = {
  setPenColor: React.Dispatch<React.SetStateAction<string>>;
};

export const ChangeColorDialog = ({ setPenColor }: Props) => {
  return (
    <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
      <Stack direction="row">
        <ColorButton color="black" setPenColor={setPenColor}/>
        <ColorButton color="red" setPenColor={setPenColor}/>
        <ColorButton color="blue" setPenColor={setPenColor}/>
        <ColorButton color="yellow" setPenColor={setPenColor}/>
      </Stack>
      <Stack direction="row">
        <ColorButton color="green" setPenColor={setPenColor}/>
        <ColorButton color="orange" setPenColor={setPenColor}/>
        <ColorButton color="pink" setPenColor={setPenColor}/>
        <ColorButton color="purple" setPenColor={setPenColor}/>
      </Stack>
    </Stack>
  );
};
