import React, { useEffect, useState } from "react";

import { Stack, Typography } from "@mui/material";
import * as Tone from 'tone';
import { MinusButton } from "../../components/buttons/MinusButton.tsx";
import { PlusButton } from "../../components/buttons/PlusButton.tsx";
import { StartButton } from "../../components/buttons/StartButton.tsx";
import { StopButton } from "../../components/buttons/StopButton.tsx";
import { BeatDisplay } from "./BeatDisplay/index.tsx";

export const BpmChanger = () => {
  const [bpm, setBpm] = useState(120);
  const [beat, setBeat] = useState(3);

  const onClickPlusButton = () => {
    setBpm(bpm + 10);
  }
  const onClickMinusButton = () => {
    setBpm(bpm - 10);
  }

  const [audioBuffer, setAudioBuffer] = useState <AudioBuffer>();
  const [loop, setLoop] = useState <Tone.Loop>();

  useEffect(() => {
    const loadAudio = async () => {
      const response = await fetch('/audio/metronome.wav');
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await Tone.context.decodeAudioData(arrayBuffer);
      setAudioBuffer(buffer);
    };

    loadAudio();
  }, []);

  useEffect(() => {
    if (audioBuffer) {
      const player = new Tone.Player(audioBuffer).toDestination();
      const newLoop = new Tone.Loop((time) => {
        player.start(time);
        setBeat((prevBeat) => (prevBeat + 1) % 4);
      }, "4n");
      setLoop(newLoop);
    }
  }, [audioBuffer]);

  useEffect(() => {
    if (loop) {
      Tone.Transport.bpm.value = bpm;
    }
  }, [bpm, loop]);

  const startMetronome = () => {
    if (loop) {
      Tone.Transport.start();
      loop.start(0);
    }
  };

  const stopMetronome = () => {
    if (loop) {
      loop.stop();
      Tone.Transport.stop();
      Tone.Transport.cancel();
      setBeat(3);
    }
  };
  
  return (
    <Stack  spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <StartButton onClick={startMetronome}/>

        <StopButton onClick={stopMetronome}/>

        <MinusButton onClick={onClickMinusButton}/>

        <Typography>BPM : {bpm}</Typography>

        <PlusButton onClick={onClickPlusButton}/>
      </Stack>
      <Stack>
        <BeatDisplay beat={beat}/>
      </Stack>
    </Stack>
  );
};
