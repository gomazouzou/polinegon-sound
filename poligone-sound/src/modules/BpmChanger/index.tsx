import React,{useState} from "react";

import { MinusButton } from "../../components/buttons/MinusButton.tsx";
import { PlusButton } from "../../components/buttons/PlusButton.tsx";
import { Stack, Typography } from "@mui/material";

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
        <MinusButton onClick={onClickMinusButton}/>

        <Typography>BPM : {bpm}</Typography>

        <PlusButton onClick={onClickPlusButton}/>
      </Stack>
    </>
  );
};
