import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import { Stack } from "@mui/material";
import React from "react";

export const BeatDisplay = ({beat}) => {
  const icons = [0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
    <AudiotrackIcon
      key={index}
      style={{ color: index === beat ? 'gray' : 'lightgray' }}
    />
  ));

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
      {icons}
    </Stack>
  );
}
