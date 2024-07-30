import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';

export const QuantizeSelector = ({ quantizeRef }) => {
  const handleChange = (event) => {
    quantizeRef.current = event.target.value;
  };

  return (
    <FormControl style={{width: "80px"}}>
      <InputLabel id="quantize-select-label">Quantize</InputLabel>
      <Select
        labelId="quantize-select-label"
        id="quantize-select"
        value={quantizeRef.current}
        label="Quantize"
        onChange={handleChange}
      >
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={16}>16</MenuItem>
      </Select>
    </FormControl>
  );
};
