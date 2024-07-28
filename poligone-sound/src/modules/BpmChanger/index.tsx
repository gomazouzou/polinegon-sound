import React, { useState } from "react";

import { Stack, Typography } from "@mui/material";
import { MinusButton } from "../../components/buttons/MinusButton.tsx";
import { PlusButton } from "../../components/buttons/PlusButton.tsx";
import { StartButton } from "../../components/buttons/StartButton.tsx";
import { StopButton } from "../../components/buttons/StopButton.tsx";

export const BpmChanger = () => {
  const [bpm, setBpm] = useState(120);
  const onClickPlusButton = () => {
    setBpm(bpm + 10);
  }
  const onClickMinusButton = () => {
    setBpm(bpm - 10);
  }
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <StartButton onClick={()=> {}}/>
        <StopButton onClick={()=> {}}/>
        <MinusButton onClick={onClickMinusButton}/>

        <Typography>BPM : {bpm}</Typography>

        <PlusButton onClick={onClickPlusButton}/>
      </Stack>
    </>
  );
};
