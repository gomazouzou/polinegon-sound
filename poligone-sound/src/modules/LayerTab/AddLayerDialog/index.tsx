import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack
} from '@mui/material';
import React, { useState } from 'react';

import { FreeDrawingButton } from '../../../components/buttons/FreeDrawingButton.tsx';
import { LineButton } from '../../../components/buttons/LineButton.tsx';
import { PoligoneButton } from '../../../components/buttons/PoligoneButton.tsx';
import { DEFAULT_LINE_WIDTH } from '../../../config/constants.tsx';
import { Type } from '../../../types/layer.tsx';
import { ColorSelector } from './ColorSelector/index.tsx';
import { LineWidthSlider } from './LineWidthSelector/index.tsx';

type Props = {
  open: boolean;
  onClose: () => void;
  addLayer: (color: string, lineWidth: number,type: Type) => void;
};

export const AddLayerDialog = ({open, onClose, addLayer}: Props) =>  {
  const [type, setType] = useState<Type>(Type.Line);
  const [color, setColor] = useState<string>("black");
  const [lineWidth, setLineWidth] = useState<number>(DEFAULT_LINE_WIDTH);

  const buttonStyle = (type: Type) => ({
    backgroundColor: isSelected(type) ?  "#E0E0E0" : "transparent",
    width: "100px",
    height: "100px",
  });

  const isSelected = (color_i: Type) => type === color_i;
  
  return (
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          style: {
            width: '500px', 
            height: '400px',
          }
        }}
      >
        <DialogTitle fontWeight="bold">新しい楽器を追加</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Stack>
              <DialogContentText>
                タイプを選択
              </DialogContentText>

              <Stack direction="row" alignItems={"center"} justifyContent="space-between" marginLeft={10} marginRight={10}>
                <LineButton onClick={() => setType(Type.Line)} style={buttonStyle(Type.Line)}/>
                <PoligoneButton onClick={() => setType(Type.Poligone)} style={buttonStyle(Type.Poligone)}/>
                <FreeDrawingButton onClick={() => setType(Type.Free)} style={buttonStyle(Type.Free)}/>
              </Stack>
            </Stack>

            <Stack>
              <DialogContentText>
                色を選択
              </DialogContentText>
              <ColorSelector color={color}setPenColor={setColor} />
            </Stack>

            <Stack>
              <DialogContentText>
                太さを選択
              </DialogContentText>
              <Stack alignItems="center">
                <LineWidthSlider
                  color={color}
                  setLineWidth={setLineWidth}
                  lineWidth={lineWidth}
                />
              </Stack>
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>とじる</Button>
          <Button onClick={() => {addLayer(color, lineWidth, type); onClose();}}>決定</Button>
        </DialogActions>
      </Dialog>
  );
}
