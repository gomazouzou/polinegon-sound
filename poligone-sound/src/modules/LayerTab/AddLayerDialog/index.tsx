import React, { useState }  from 'react';
import {
  Button, 
  Stack,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle} from '@mui/material';

import { PoligoneButton } from '../../../components/buttons/PoligoneButton.tsx';
import { LineButton } from '../../../components/buttons/LineButton.tsx';
import { ColorSelector } from './ColorSelector/index.tsx';
import { LineWidthSlider } from './LineWidthSelector/index.tsx';
import { Type } from '../../../types/layer.tsx';

type Props = {
  open: boolean;
  onClose: () => void;
  addLayer: (color: string, lineWidth: number,type: Type) => void;
};

export const AddLayerDialog = ({open, onClose, addLayer}: Props) =>  {
  const [type, setType] = useState<Type>(Type.Line);
  const [color, setColor] = useState<string>("black");
  const [lineWidth, setLineWidth] = useState<number>(3);
  
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
                線か図形を選択
              </DialogContentText>

              <Stack direction="row" alignItems={"center"} justifyContent="space-between" marginLeft={10} marginRight={10}>
                <LineButton onClick={() => setType(Type.Line)}/>
                <PoligoneButton onClick={() => setType(Type.Poligone)}/>
              </Stack>
            </Stack>

            <Stack>
              <DialogContentText>
                色を選択
              </DialogContentText>
              <ColorSelector setPenColor={setColor} />
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
