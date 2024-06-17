import React from "react"

import { DrawButton } from "../../components/buttons/DrawButton.tsx";
import { EraserButton } from "../../components/buttons/EraserButton.tsx";
import { LineWidthSlider } from "./LineWidthSlider/index.tsx";
import { ChangeColorPalette } from "./ChangeColorPalette/index.tsx";
import { Layer } from "../../types/layer.tsx";
import { RedrawLayer } from "../../functions/Canvas.tsx";

import { Stack } from "@mui/material";

type Props = {
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  currentLayer: number;
  canvasColor: string;
  setIsErasing: (value: boolean | ((prevState:  boolean) => boolean)) => void;
}

export const DrawingPannel = ({ layers, setLayers, currentLayer, canvasColor, setIsErasing}: Props) => {  
  return(
   <div
          style={{
            width: '1390px',
            height: '120px',
            border: '1px solid black',
            backgroundColor: canvasColor,
            position: 'absolute',
            top: 0,
            left: 0
          }}
        >
          <div
          style={{
            width: '90px',
            height: '120px',
            backgroundColor: canvasColor,
            position: 'absolute',
            top: 0,
            left: 0
          }}
          >
            <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
              <DrawButton onClick={() => setIsErasing(false)} />
              <EraserButton onClick={() => setIsErasing(true)} />
            </Stack>
          </div>

          <div
          style={{
            width: '360px',
            height: '120px',
            backgroundColor: 'white',
            position: 'absolute',
            top: 0,
            left: 90
          }}
          >
            <Stack alignItems="center"  justifyContent="center" style={{ height: '100%' }}>
              <LineWidthSlider 
                layers={layers}
                setLayers={setLayers}
                currentLayer={currentLayer}
                redrawLayer={(layer:Layer) => RedrawLayer(layer, canvasColor)}
              />
            </Stack>
          </div>
          <div
          style={{
            width: '120px',
            height: '120px',
            backgroundColor: canvasColor,
            position: 'absolute',
            top: 0,
            left: 510
          }}
          >
            <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
              <ChangeColorPalette 
                layers={layers}
                setLayers={setLayers}
                currentLayer={currentLayer}
                redrawLayer={(layer:Layer) => RedrawLayer(layer, canvasColor)}
              />
            </Stack>
          </div>
        </div>
  );
};
