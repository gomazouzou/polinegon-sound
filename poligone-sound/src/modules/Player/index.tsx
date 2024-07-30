import React, { useEffect, useState } from "react";

import { Stack, Typography } from "@mui/material";
import * as Tone from 'tone';
import { MinusButton } from "../../components/buttons/MinusButton.tsx";
import { PlusButton } from "../../components/buttons/PlusButton.tsx";
import { StartButton } from "../../components/buttons/StartButton.tsx";
import { StopButton } from "../../components/buttons/StopButton.tsx";
import { PROCESSS_SPAN } from "../../config/constants.tsx";
import { ChangeInstrumentIdToPlayer, ChangePlayerToLoop, ChangeSamplerToLoop } from "../../hooks/useInstrumentIdToPlayer.tsx";
import { LoopInfo, Type } from "../../types/loop.tsx";
import { BeatDisplay } from "./BeatDisplay/index.tsx";

type Props = {
  loops: LoopInfo[];
  UpdateBeatCount: () => void;
  beatCountRef: React.MutableRefObject<number>;
  metronomeAudioBuffer: AudioBuffer | undefined;
  figureAudioBuffers: AudioBuffer[];
  lineAudioSamplers: Tone.Sampler[] | null;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setStartFigureDrawing: React.Dispatch<React.SetStateAction<boolean>>;
  setWaitFigureDrawing: React.Dispatch<React.SetStateAction<boolean>>;
  waitFigureDrawing: boolean;
}

export const Player = ({loops, UpdateBeatCount, beatCountRef, metronomeAudioBuffer, figureAudioBuffers, lineAudioSamplers,setIsPlaying, setStartFigureDrawing, setWaitFigureDrawing, waitFigureDrawing}: Props) => {
  const [bpm, setBpm] = useState(120);
  const [beat, setBeat] = useState(7);

  const [figureLoops, setFigureLoops] = useState <Tone.Part[] | null>(null);
  const [metronome, setMetronome] = useState<Tone.Part | null>(null);

  const onLongPressPlusButton = () => {
    setBpm(prevBpm => prevBpm + 2);
  }
  const onLongPressMinusButton = () => {
    setBpm(prevBpm => prevBpm - 2);
  }

  const createMetronome = () => {
    if (metronomeAudioBuffer) { 
      const player = new Tone.Player(metronomeAudioBuffer).toDestination();
      const newPart = new Tone.Part((time, value) => {
        player.start(time);
        setBeat((prevBeat) => (prevBeat + 1) % 8);
      }, [
        { time: "0:0:0" },  
        { time: "0:1:0" },  
        { time: "0:2:0" }, 
        { time: "0:3:0" },    
      ]);
      newPart.loop = true;
      newPart.loopEnd = "1m";
      return newPart;
    }
    else{
      return null;
    }
  };

  const initializeLoops = (loops: LoopInfo[]) => {
    const newFigureLoops: Tone.Part[] = [];
    loops.forEach(loop => {
      if (loop.type === Type.Poligone) {
        const player = ChangeInstrumentIdToPlayer(loop.instrument, loop.type, figureAudioBuffers, loop.volume);
        if (!player) return;
        const newPart = ChangePlayerToLoop(player, loop.figure_id);
        newFigureLoops.push(newPart);
      }
      if (loop.type === Type.Line) {
        if (!lineAudioSamplers) return;
        const newPart = ChangeSamplerToLoop(lineAudioSamplers[loop.instrument], loop.midi, loop.volume);
        newFigureLoops.push(newPart);
      }
    });
    return newFigureLoops;
  };

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm, figureLoops]);

  useEffect(() => {
    if (figureLoops) {
      figureLoops.forEach(loop => loop.stop());
    }
    const newFigureLoops = initializeLoops(loops);
    setFigureLoops(newFigureLoops);
    newFigureLoops.forEach(loop => loop.start(0));
  }, [loops]);

  const startMusic = () => {
    if (!metronome) {
      const newMetronome = createMetronome();
      setMetronome(newMetronome);
      newMetronome?.start(0);
    }
    if (!figureLoops) {
      const newFigureLoops = initializeLoops(loops);
      setFigureLoops(newFigureLoops);
      newFigureLoops?.forEach(loop => loop.start(0));
    }
    Tone.Transport.scheduleRepeat(UpdateBeatCount, `${PROCESSS_SPAN}n`);
    Tone.Transport.start();
    setIsPlaying(true);
    setStartFigureDrawing(false);
    setWaitFigureDrawing(false);
  };

  const stopMusic = () => {
    figureLoops?.forEach(loop => loop.stop());
    metronome?.stop();
    Tone.Transport.stop();
    setBeat(3);
    setMetronome(null);
    setFigureLoops(null);
    beatCountRef.current = 0;
    setIsPlaying(false);
    setStartFigureDrawing(false);
    setWaitFigureDrawing(false);
  };
  
  return (
    <Stack  spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <StartButton onClick={startMusic}/>

        <StopButton onClick={stopMusic}/>

        <MinusButton onLongPress={onLongPressMinusButton} disabled={waitFigureDrawing}/>

        <Typography>BPM : {bpm}</Typography>

        <PlusButton onLongPress={onLongPressPlusButton} disabled={waitFigureDrawing}/>
      </Stack>
      <Stack>
        <BeatDisplay beat={beat}/>
      </Stack>
    </Stack>
  );
};
