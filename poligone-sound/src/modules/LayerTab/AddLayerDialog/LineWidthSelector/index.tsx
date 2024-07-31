import React from "react";
import { styled } from '@mui/material/styles';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MuiInput from '@mui/material/Input';
import { Box, Grid, Slider } from "@mui/material";

import { DEFAULT_LINE_WIDTH, MAX_LINE_WIDTH, MIN_LINE_WIDTH } from "../../../../config/constants.tsx"

type Props = {
  color: string;
  lineWidth: number;
  setLineWidth: React.Dispatch<React.SetStateAction<number>>;
}

const Input = styled(MuiInput)`
  width: 42px;
`;

export const LineWidthSlider = ({color, lineWidth, setLineWidth } : Props) => {

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setLineWidth(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue: number = event.target.value === '' ? MIN_LINE_WIDTH : Number(event.target.value);
    setLineWidth(newValue);
  };

  const handleBlur = () => {
    if (lineWidth < MIN_LINE_WIDTH) {
      setLineWidth(MIN_LINE_WIDTH);
    } else if (lineWidth > MAX_LINE_WIDTH) {
      setLineWidth(MAX_LINE_WIDTH);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <DriveFileRenameOutlineIcon />
        </Grid>
        <Grid item xs>
          <Slider
            style={{color: color}}
            defaultValue={DEFAULT_LINE_WIDTH}
            min={MIN_LINE_WIDTH}
            max={MAX_LINE_WIDTH}
            step={1}
            value={lineWidth}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
            <Input
                value={lineWidth}
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
        </Grid>
      </Grid>
    </Box>
  );
};
