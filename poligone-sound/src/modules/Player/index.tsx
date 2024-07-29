import React, { useEffect, useState } from "react";

import { Stack, Typography } from "@mui/material";
import * as Tone from 'tone';
import { MinusButton } from "../../components/buttons/MinusButton.tsx";
import { PlusButton } from "../../components/buttons/PlusButton.tsx";
import { StartButton } from "../../components/buttons/StartButton.tsx";
import { StopButton } from "../../components/buttons/StopButton.tsx";
import { RHYTHM_PATTERN_1 } from "../../config/constants.tsx";
import { BeatDisplay } from "./BeatDisplay/index.tsx";

export const Player = () => {
  const [bpm, setBpm] = useState(120);
  const [beat, setBeat] = useState(3);

  const onClickPlusButton = () => {
    setBpm(bpm + 10);
  }
  const onClickMinusButton = () => {
    setBpm(bpm - 10);
  }

  const [metronomeAudioBuffer, setMetronomeAudioBuffer] = useState <AudioBuffer>();
  const [figure1AudioBuffer, setFigure1AudioBuffer] = useState <AudioBuffer>();
  const [figure2AudioBuffer, setFigure2AudioBuffer] = useState <AudioBuffer>();
  const [figure3AudioBuffer, setFigure3AudioBuffer] = useState <AudioBuffer>();
  const [figure4AudioBuffer, setFigure4AudioBuffer] = useState <AudioBuffer>();
  const [figure5AudioBuffer, setFigure5AudioBuffer] = useState <AudioBuffer>();
  const [figure6AudioBuffer, setFigure6AudioBuffer] = useState <AudioBuffer>();
  const [figure7AudioBuffer, setFigure7AudioBuffer] = useState <AudioBuffer>();
  const [figure8AudioBuffer, setFigure8AudioBuffer] = useState <AudioBuffer>();

  const [figureLoops, setFigureLoops] = useState <Tone.Part[]>([]);

  useEffect(() => {
    const loadAudio = async () => {
      const response = await fetch('/audio/metronome.wav');
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await Tone.context.decodeAudioData(arrayBuffer);
      setMetronomeAudioBuffer(buffer);

      const response1 = await fetch('/audio/figure_1.wav');
      const arrayBuffer1 = await response1.arrayBuffer();
      const buffer1 = await Tone.context.decodeAudioData(arrayBuffer1);
      setFigure1AudioBuffer(buffer1);

      const response2 = await fetch('/audio/figure_2.wav');
      const arrayBuffer2 = await response2.arrayBuffer();
      const buffer2 = await Tone.context.decodeAudioData(arrayBuffer2);
      setFigure2AudioBuffer(buffer2);

      const response3 = await fetch('/audio/figure_3.wav');
      const arrayBuffer3 = await response3.arrayBuffer();
      const buffer3 = await Tone.context.decodeAudioData(arrayBuffer3);
      setFigure3AudioBuffer(buffer3);

      const response4 = await fetch('/audio/figure_4.wav');
      const arrayBuffer4 = await response4.arrayBuffer();
      const buffer4 = await Tone.context.decodeAudioData(arrayBuffer4);
      setFigure4AudioBuffer(buffer4);

      const response5 = await fetch('/audio/figure_5.wav');
      const arrayBuffer5 = await response5.arrayBuffer();
      const buffer5 = await Tone.context.decodeAudioData(arrayBuffer5);
      setFigure5AudioBuffer(buffer5);

      const response6 = await fetch('/audio/figure_6.wav');
      const arrayBuffer6 = await response6.arrayBuffer();
      const buffer6 = await Tone.context.decodeAudioData(arrayBuffer6);
      setFigure6AudioBuffer(buffer6);

      const response7 = await fetch('/audio/figure_7.wav');
      const arrayBuffer7 = await response7.arrayBuffer();
      const buffer7 = await Tone.context.decodeAudioData(arrayBuffer7);
      setFigure7AudioBuffer(buffer7);

      const response8 = await fetch('/audio/figure_8.wav');
      const arrayBuffer8 = await response8.arrayBuffer();
      const buffer8 = await Tone.context.decodeAudioData(arrayBuffer8);
      setFigure8AudioBuffer(buffer8);
    };

    loadAudio();
  }, []);

  const createLoops = () => {
    const newLoops: Tone.Part[] = [];

    if (metronomeAudioBuffer) {
      const player = new Tone.Player(metronomeAudioBuffer).toDestination();
      const newPart = new Tone.Part((time, value) => {
        player.start(time);
        setBeat((prevBeat) => (prevBeat + 1) % 4);
      }, [
        { time: "0:0:0" },
        { time: "0:1:0" },
        { time: "0:2:0" },
        { time: "0:3:0" }
      ]);
      newPart.loop = true;
      newPart.loopEnd = "1m";
      newLoops.push(newPart);
    }

    if (figure1AudioBuffer) {
      const player = new Tone.Player(figure1AudioBuffer).toDestination();
      const newPart = new Tone.Part((time, value) => {
        player.start(time);
      }, RHYTHM_PATTERN_1);
      newPart.loop = true;
      newPart.loopEnd = "1m";
      newLoops.push(newPart);
    }

    return newLoops;
  };

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm, figureLoops]);

  const startMusic = () => {
    const newLoops = createLoops();
    setFigureLoops(newLoops);
    Tone.Transport.start();
    figureLoops.forEach(loop => loop.start(0));
  };

  const stopMusic = () => {
    figureLoops.forEach(loop => loop.stop());
    Tone.Transport.stop();
    setBeat(3);
    setFigureLoops([]);
  };
  
  return (
    <Stack  spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <StartButton onClick={startMusic}/>

        <StopButton onClick={stopMusic}/>

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
