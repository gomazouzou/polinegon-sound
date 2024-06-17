import React from "react";
import { Card, Typography, Stack } from "@mui/material";
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';

import { VisibleButton } from "../../../components/buttons/VisibleButton.tsx";
import { Layer, Type } from "../../../types/layer.tsx";


type Props = {
  layer: Layer;
  id: number;
  setCurrentLayer: React.Dispatch<React.SetStateAction<number>>;
  isHilighted: boolean;
  onClickVisibleButton: () => void;
}

export const LayerCard = ({layer, id, setCurrentLayer, isHilighted, onClickVisibleButton}: Props) => {
  return (
    <Card 
      onClick = {() => {
        setCurrentLayer(layer.id); 
      }}
      sx={{  border: isHilighted ? '3px solid ' + layer.color : '1.5px solid ' + layer.color }} 
    >
      <Stack direction="row" alignItems={"center"} justifyContent="space-between" p={2}>
        <Typography fontSize={18}>{id+1}. {layer.color}</Typography>
        <Stack direction="row" alignItems={"center"}>
        <Typography fontSize={18} marginRight={2}> width: {layer.lineWidth} </Typography>
          {
            layer.type === Type.Line ? (
              <MultilineChartIcon  style={{ fontSize: '24px', color: layer.color}}/>
            ): (
              <ChangeHistoryIcon style={{ fontSize: '24px', color: layer.color}}/>
            )
          }
          <VisibleButton color={layer.color} isVisible={layer.isVisible} onClick={onClickVisibleButton}/>
        </Stack>
      </Stack>
    </Card>
  )
}
