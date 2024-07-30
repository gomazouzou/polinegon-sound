import { Stack } from "@mui/material";
import React from "react";

import { ColorButton } from "../../../../components/buttons/ColorButton.tsx";

type Props = {
  setPenColor: React.Dispatch<React.SetStateAction<string>>;
  color: string;
};


export const ColorSelector = ({setPenColor, color}: Props) => {
  const buttonStyle = (color: string) => ({
    borderRadius: "50%",
    backgroundColor: isSelected(color) ?  "#E0E0E0" : "transparent",
    width: "40px",
    height: "40px",
    margin: "5px"
  });
  
  const isSelected = (color_i: string) => color === color_i;

  return (
    <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
      <Stack direction="row">
        <ColorButton color="black" setPenColor={setPenColor} style={buttonStyle("black")}/>
        <ColorButton color="red" setPenColor={setPenColor} style={buttonStyle("red")}/>
        <ColorButton color="blue" setPenColor={setPenColor} style={buttonStyle("blue")}/>
        <ColorButton color="yellow" setPenColor={setPenColor} style={buttonStyle("yellow")}/>
        <ColorButton color="green" setPenColor={setPenColor} style={buttonStyle("green")}/>
        <ColorButton color="orange" setPenColor={setPenColor} style={buttonStyle("orange")}/>
        <ColorButton color="pink" setPenColor={setPenColor} style={buttonStyle("pink")}/>
        <ColorButton color="purple" setPenColor={setPenColor} style={buttonStyle("purple")}/>
      </Stack>
    </Stack>
  );
};
