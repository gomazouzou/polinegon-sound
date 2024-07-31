import { Stack } from "@mui/material";
import React from "react";

import { ColorButton } from "../../../components/buttons/ColorButton.tsx";
import { Layer } from "../../../types/layer.tsx";

type Props = {
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  currentLayerId: number;
  redrawLayer: (layer: Layer) => void;
};

export const ChangeColorPalette = ({layers, setLayers, currentLayerId, redrawLayer}: Props) => {
  const changeLayerColor = (color: string) => {
    setLayers(prevLayers => {
      const newLayers = [...prevLayers];
      const targetLayerIndex =  newLayers.findIndex(layer => layer.id === currentLayerId);
      newLayers[targetLayerIndex] = { ...newLayers[targetLayerIndex], color:color };
      redrawLayer(newLayers[targetLayerIndex]);
      return newLayers;
    });
  };

  const buttonStyle = (color: string) => ({
    borderRadius: "50%",
    backgroundColor: isSelected(color) ?  "#E0E0E0" : "transparent",
    width: "40px",
    height: "40px",
    margin: "5px"
  });
  const targetLayer = layers.find(layer => layer.id === currentLayerId);
  const isSelected = (color: string) => targetLayer?.color === color;

  return (
    <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
      <Stack direction="row">
        <ColorButton color="black" setPenColor={changeLayerColor} style={buttonStyle("black")}/>
        <ColorButton color="red" setPenColor={changeLayerColor} style={buttonStyle("red")}/>
        <ColorButton color="blue" setPenColor={changeLayerColor} style={buttonStyle("blue")}/>
        <ColorButton color="yellow" setPenColor={changeLayerColor} style={buttonStyle("yellow")}/>
      </Stack>
      <Stack direction="row">
        <ColorButton color="green" setPenColor={changeLayerColor} style={buttonStyle("green")}/>
        <ColorButton color="orange" setPenColor={changeLayerColor} style={buttonStyle("orange")}/>
        <ColorButton color="pink" setPenColor={changeLayerColor} style={buttonStyle("pink")}/>
        <ColorButton color="purple" setPenColor={changeLayerColor} style={buttonStyle("purple")}/>
      </Stack>
    </Stack>
  );
};
