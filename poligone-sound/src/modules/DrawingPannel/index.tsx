import React from "react";

import { Figure00Button } from "../../components/buttons/Figure00Button.tsx";
import { Figure01Button } from "../../components/buttons/Figure01Button.tsx";
import { Figure02Button } from "../../components/buttons/Figure02Button.tsx";
import { Figure03Button } from "../../components/buttons/Figure03Button.tsx";
import { RedrawLayer } from "../../functions/Canvas.tsx";
import { Layer } from "../../types/layer.tsx";
import { LoopInfo } from "../../types/loop.tsx";
import { ChangeColorPalette } from "./ChangeColorPalette/index.tsx";
import { LineWidthSlider } from "./LineWidthSlider/index.tsx";
import { QuantizeSelector } from "./QuantizeSelector/index.tsx";

import { Stack, } from "@mui/material";

type Props = {
  setCurrentFigure: React.Dispatch<React.SetStateAction<number>>;
  currentFigure: number;
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>;
  currentLayer: number;
  canvasColor: string;
  setLoops: React.Dispatch<React.SetStateAction<LoopInfo[]>>;
  quantizeRef: React.MutableRefObject<number>
}

export const DrawingPannel = ({ setCurrentFigure, currentFigure, layers, setLayers, currentLayer, canvasColor, setLoops, quantizeRef}: Props) => { 
  const buttonStyle = (num: number) => ({
    borderRadius: 0,
    backgroundColor: isSelected(num) ?  'rgba(173, 216, 230, 0.2)' : "transparent",
    width: "100px",
    height: "100px",
    margin: "5px"
  });

  const isSelected = (num: number) => currentFigure === num;

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
            <Stack direction="row" alignItems="center"  justifyContent="center" style={{ height: '100%' }} spacing={5}>
              <QuantizeSelector quantizeRef={quantizeRef}/>

              <LineWidthSlider 
                layers={layers}
                setLayers={setLayers}
                currentLayer={currentLayer}
                redrawLayer={(layer:Layer) => RedrawLayer(layer, setLoops)}
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
                redrawLayer={(layer:Layer) => RedrawLayer(layer, setLoops)}
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
                top: 4,
                left: -220,
              }}
            >
              <Figure00Button onClick={() => setCurrentFigure(0)} style={buttonStyle(0)}/>
            </div>
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: canvasColor,
                position: 'absolute',
                top: 4,
                left: -80,
              }}
            >
              <Figure01Button onClick={() => setCurrentFigure(1)} style={buttonStyle(1)}/>
            </div>
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: canvasColor,
                position: 'absolute',
                top: 4,
                left: 80,
              }}
            >
              <Figure02Button onClick={() => setCurrentFigure(2)} style={buttonStyle(2)}/>
            </div>
            <div
              style={{
                width: '80px',
                height: '80px',
                backgroundColor: canvasColor,
                position: 'absolute',
                top: 4,
                left: 240,
              }}
            >
              <Figure03Button onClick={() => setCurrentFigure(3)} style={buttonStyle(3)}/>
            </div>
          </div>
        </div>
  );
};
