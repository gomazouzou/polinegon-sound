import React from "react";
import { styled } from '@mui/material/styles';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MuiInput from '@mui/material/Input';
import { Box, Grid, Slider } from "@mui/material";

import { MAX_LINE_WIDTH, MIN_LINE_WIDTH, DEFAULT_LINE_WIDTH } from "../../../config/constants.tsx";
import { Layer } from "../../../types/layer.tsx";

type Props = {
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  currentLayer: number;
  redrawLayer: (layer: Layer) => void;
}

const Input = styled(MuiInput)`
  width: 42px;
`;

export const LineWidthSlider = ({layers, setLayers, currentLayer, redrawLayer}:Props) => {
  
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const updatedLayers = [...layers];
    const targetLayerIndex =  updatedLayers.findIndex(layer => layer.id === currentLayer);
    updatedLayers[targetLayerIndex].lineWidth = newValue as number;
    setLayers(updatedLayers);
    redrawLayer(layers[targetLayerIndex]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? MIN_LINE_WIDTH : Number(event.target.value);
    const updatedLayers = [...layers];
    const targetLayerIndex =  updatedLayers.findIndex(layer => layer.id === currentLayer);
    updatedLayers[targetLayerIndex].lineWidth = newValue;
    setLayers(updatedLayers);
    redrawLayer(layers[targetLayerIndex]);
  };

  const handleBlur = () => {
    const updatedLayers = [...layers];
    const targetLayerIndex =  updatedLayers.findIndex(layer => layer.id === currentLayer);
    if (updatedLayers[targetLayerIndex].lineWidth < MIN_LINE_WIDTH) {
      updatedLayers[targetLayerIndex].lineWidth = MIN_LINE_WIDTH;
    } else if (updatedLayers[targetLayerIndex].lineWidth > MAX_LINE_WIDTH) {
      updatedLayers[currentLayer].lineWidth = MAX_LINE_WIDTH;
    }
    setLayers(updatedLayers);
    redrawLayer(layers[targetLayerIndex]);
  };
  const targetLayer =  layers.find(layer => layer.id === currentLayer);

  return (
    <Box sx={{ width: 250 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <DriveFileRenameOutlineIcon />
        </Grid>
        <Grid item xs>
          {targetLayer && (
              <Slider
                style={{color:  targetLayer.color}}
                defaultValue={DEFAULT_LINE_WIDTH}
                min={MIN_LINE_WIDTH}
                max={MIN_LINE_WIDTH}
                step={1}
                value={targetLayer.lineWidth}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            )
          }
        </Grid>
        <Grid item>
          {targetLayer && (
              <Input
                  value={targetLayer.lineWidth}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 1,
                    min: MIN_LINE_WIDTH,
                    max: MAX_LINE_WIDTH,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
              />
            )
          }
          
        </Grid>
      </Grid>
    </Box>
  );
};