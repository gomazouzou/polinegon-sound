import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';
import { Card, Stack, Typography } from "@mui/material";
import React from "react";

import { Layer, Type } from "../../../types/layer.tsx";


type Props = {
  layer: Layer;
  id: number;
  setCurrentLayer: React.Dispatch<React.SetStateAction<number>>;
  isHilighted: boolean;
}

export const LayerCard = ({layer, id, setCurrentLayer, isHilighted}: Props) => {
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
        </Stack>
      </Stack>
    </Card>
  )
}
