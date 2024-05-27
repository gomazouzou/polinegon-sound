import React from "react";
import { styled } from '@mui/material/styles';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import MuiInput from '@mui/material/Input';
import { Box, Typography, Grid, Slider } from "@mui/material";

type Props = {
  value: number;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const Input = styled(MuiInput)`
  width: 42px;
`;

export const LineWidthSlider = ({value, defaultValue, minValue, maxValue, setValue}:Props) => {
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? 1 : Number(event.target.value));
  };
  const handleBlur = () => {
    if (value < minValue) {
      setValue(minValue);
    } else if (value > maxValue) {
      setValue(maxValue);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        太さ
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <DriveFileRenameOutlineIcon />
        </Grid>
        <Grid item xs>
          <Slider
            defaultValue={defaultValue}
            min={minValue}
            max={maxValue}
            step={1}
            value={typeof value === 'number' ? value : minValue}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: minValue,
              max: maxValue,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
