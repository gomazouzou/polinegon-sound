import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import PolylineIcon from '@mui/icons-material/Polyline';
import { Card, Stack, Typography } from "@mui/material";
import React from "react";

import { Layer, Type } from "../../../types/layer.tsx";


type Props = {
  layer: Layer;
  id: number;
  setCurrentLayerId: React.Dispatch<React.SetStateAction<number>>;
  isHilighted: boolean;
  disabled: boolean;
}

export const LayerCard = ({layer, id, setCurrentLayerId, isHilighted, disabled}: Props) => {
  return (
    <Card 
      onClick = {() => {
        if (disabled) return;
        setCurrentLayerId(layer.id); 
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
            ): layer.type === Type.Poligone ? (
              <ChangeHistoryIcon style={{ fontSize: '24px', color: layer.color}}/>
            ): layer.type === Type.Free ? (
              <PolylineIcon style={{ fontSize: '24px', color: layer.color}}/>
            ): null
          }
        </Stack>
      </Stack>
    </Card>
  )
}
