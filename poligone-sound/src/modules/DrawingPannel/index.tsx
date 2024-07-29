import React from "react";

import { Figure00Button } from "../../components/buttons/Figure00Button.tsx";
import { Figure01Button } from "../../components/buttons/Figure01Button.tsx";
import { Figure02Button } from "../../components/buttons/Figure02Button.tsx";
import { Figure03Button } from "../../components/buttons/Figure03Button.tsx";
import { RedrawLayer } from "../../functions/Canvas.tsx";
import { Layer } from "../../types/layer.tsx";
import { ChangeColorPalette } from "./ChangeColorPalette/index.tsx";
import { LineWidthSlider } from "./LineWidthSlider/index.tsx";

import { Stack, } from "@mui/material";

type Props = {
  setCurrentFigure: React.Dispatch<React.SetStateAction<number>>;
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  currentLayer: number;
  canvasColor: string;
}

export const DrawingPannel = ({ setCurrentFigure, layers, setLayers, currentLayer, canvasColor}: Props) => {  
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
                redrawLayer={(layer:Layer) => RedrawLayer(layer)}
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
                redrawLayer={(layer:Layer) => RedrawLayer(layer)}
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
            left: 980
          }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: canvasColor,
                position: 'absolute',
                top: 20,
                left: -220,
              }}
            >
              <Figure00Button onClick={() => setCurrentFigure(0)}/>
            </div>
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: canvasColor,
                position: 'absolute',
                top: 20,
                left: -80,
              }}
            >
              <Figure01Button onClick={() => setCurrentFigure(1)}/>
            </div>
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: canvasColor,
                position: 'absolute',
                top: 20,
                left: 80,
              }}
            >
              <Figure02Button onClick={() => setCurrentFigure(2)}/>
            </div>
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: canvasColor,
                position: 'absolute',
                top: 20,
                left: 240,
              }}
            >
              <Figure03Button onClick={() => setCurrentFigure(3)}/>
            </div>
          </div>
        </div>
  );
};
