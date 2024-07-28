import React from "react";
import { Stack } from "@mui/material";
import { Layer, Type } from "../../types/layer.tsx";
import { AddButton } from "../../components/buttons/AddButton.tsx";
import { DeleteButton } from "../../components/buttons/DeleteButton.tsx";
import { LayerCard } from "./LayerCard/index.tsx";
import { useDisclosure } from "../../hooks/useDiscloser.tsx";
import { AddLayerDialog } from "./AddLayerDialog/index.tsx";

type Props = {
  canvasColor: string;
  layers: Layer[];
  setLayers: React.Dispatch<React.SetStateAction<Layer[]>>
  currentLayer: number;
  setCurrentLayer: React.Dispatch<React.SetStateAction<number>>;
  totalLayer: number;
  setTotalLayer: React.Dispatch<React.SetStateAction<number>>;
}

export const LayerTab = ({canvasColor, layers, setLayers, currentLayer, setCurrentLayer, totalLayer, setTotalLayer}: Props) => {

  const {
    isOpen: isCOpenAddLayerDialog,
    open: openAddLayerDialog,
    close: closeAddLayerDialog,
  } = useDisclosure({});

  const addLayer = (color: string, lineWidth: number, type: Type) => {
    setLayers(prevLayers => {
      const newLayers = [
        ...prevLayers,
        {
          id: totalLayer + 1,
          ref: React.createRef<HTMLCanvasElement>(),
          color: color,
          lineWidth: lineWidth,
          drawings: [],
          type: type,
          isVisible: true,
        }
      ]
      setTotalLayer(totalLayer + 1);
      setCurrentLayer(totalLayer + 1);
      return newLayers;
    });
  };

  const deleteLayer = (layerId: number) => {
    if (layers.length < 2){
      return;
    }
    
    const currentIndex = layers.findIndex(layer => layer.id === currentLayer);
    const newLayers = layers.filter(layer => layer.id !== layerId);
    setLayers(newLayers);
    
    const newCurrentIndex = currentIndex - 1 > 0 ? newLayers[currentIndex - 1].id : newLayers[0].id
    setCurrentLayer(newCurrentIndex);
  };

  const OnClickVisibleButton = (layerId: number) => {
    setLayers(prevLayers => prevLayers.map(layer => {
      if (layer.id === layerId) {
        const newLayer = {
          ...layer,
          isVisible: !layer.isVisible 
        };
        return newLayer;
      }
      else{
        return layer;
      }
    }));
  }
  
  const currentIndex = layers.findIndex(layer => layer.id === currentLayer);

  return(
    <div
      style={{
        width: '400px',
        height: '480px',
        border: '1px solid black',
        backgroundColor: canvasColor,
        position: 'absolute',
        top: 0,
        left: 0
      }}
    >
      <div
      style={{
        width: '400px',
        height: '40px',
        border: '1px solid black',
        backgroundColor: canvasColor,
        position: 'absolute',
        top: 0,
        left: 0
      }}
      >
        <AddButton onClick={openAddLayerDialog}/>
        <DeleteButton onClick={() => deleteLayer(currentLayer)}/>
      </div>
      <div
        style={{
          width: '400px',
          height: '400px',
          backgroundColor: canvasColor,
          position: 'absolute',
          top: 45,
          left: 0,
          overflowY: 'scroll'
        }}
      >
        <Stack p={1} spacing={1}>
          {layers.map((layer, index) => (
            <LayerCard
              layer={layer}
              id={index}
              setCurrentLayer={setCurrentLayer}
              isHilighted={currentIndex === index} 
              onClickVisibleButton={() => OnClickVisibleButton(layer.id)}
            />
          ))}
        </Stack>
      </div>
      <AddLayerDialog
        open={isCOpenAddLayerDialog}
        onClose={closeAddLayerDialog}
        addLayer={addLayer}
      />
    </div>
  );
};