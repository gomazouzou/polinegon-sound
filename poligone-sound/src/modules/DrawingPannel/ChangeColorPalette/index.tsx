import React from "react";
import { Stack } from "@mui/material";

import { ColorButton } from "../../../components/buttons/ColorButton.tsx";
import { Layer } from "../../../types/layer.tsx";

type Props = {
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  currentLayer: number;
  redrawLayer: (layer: Layer) => void;
};

export const ChangeColorPalette = ({layers, setLayers, currentLayer, redrawLayer}: Props) => {
  const changeLayerColor = (color: string) => {
    setLayers(prevLayers => {
      const newLayers = [...prevLayers];
      const targetLayerIndex =  newLayers.findIndex(layer => layer.id === currentLayer);
      newLayers[targetLayerIndex] = { ...newLayers[targetLayerIndex], color:color };
      redrawLayer(newLayers[targetLayerIndex]);
      return newLayers;
    });
  };

  return (
    <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
      <Stack direction="row">
        <ColorButton color="black" setPenColor={changeLayerColor}/>
        <ColorButton color="red" setPenColor={changeLayerColor}/>
        <ColorButton color="blue" setPenColor={changeLayerColor}/>
        <ColorButton color="yellow" setPenColor={changeLayerColor}/>
      </Stack>
      <Stack direction="row">
        <ColorButton color="green" setPenColor={changeLayerColor}/>
        <ColorButton color="orange" setPenColor={changeLayerColor}/>
        <ColorButton color="pink" setPenColor={changeLayerColor}/>
        <ColorButton color="purple" setPenColor={changeLayerColor}/>
      </Stack>
    </Stack>
  );
};
