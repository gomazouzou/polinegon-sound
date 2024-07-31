import React, { useEffect, useState } from "react";

import { Stack, Typography } from "@mui/material";
import * as Tone from 'tone';
import { MinusButton } from "../../components/buttons/MinusButton.tsx";
import { PlusButton } from "../../components/buttons/PlusButton.tsx";
import { StartButton } from "../../components/buttons/StartButton.tsx";
import { StopButton } from "../../components/buttons/StopButton.tsx";
import { PROCESS_SPAN } from "../../config/constants.tsx";
import { ChangeFreePlayerToLoop, ChangeInstrumentIdToPlayer, ChangePlayerToLoop, ChangeSamplerToLoop } from "../../hooks/useInstrumentIdToPlayer.tsx";
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
  setClickFigureDrawing: React.Dispatch<React.SetStateAction<boolean>>;
  clickFigureDrawing: boolean;
}

export const Player = ({loops, UpdateBeatCount, beatCountRef, metronomeAudioBuffer, figureAudioBuffers, lineAudioSamplers, setIsPlaying, setClickFigureDrawing, clickFigureDrawing}: Props) => {
  const [bpm, setBpm] = useState(120);
  const [beat, setBeat] = useState(7);

  const [playPart, setPlayPart] = useState <Tone.Part[] | null>(null);
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
    const newPlayParts: Tone.Part[] = [];
    loops.forEach(loop => {
      if (loop.type === Type.Poligone) {
        const player = ChangeInstrumentIdToPlayer(loop.instrument, figureAudioBuffers, loop.volume);
        if (!player) return;
        const newPart = ChangePlayerToLoop(player, loop.figure_id);
        newPlayParts.push(newPart);
      }
      if (loop.type === Type.Free) {
        const player = ChangeInstrumentIdToPlayer(loop.instrument, figureAudioBuffers, loop.volume);
        if (!player) return;
        const newPart = ChangeFreePlayerToLoop(player, loop.midi);
        newPlayParts.push(newPart);
      }
      if (loop.type === Type.Line) {
        if (!lineAudioSamplers) return;
        const newPart = ChangeSamplerToLoop(lineAudioSamplers[loop.instrument], loop.midi, loop.volume);
        newPlayParts.push(newPart);
      }
    });
    return newPlayParts;
  };

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm, playPart]);

  useEffect(() => {
    if (playPart) {
      playPart.forEach(loop => loop.stop());
    }
    const newPlayParts = initializeLoops(loops);
    setPlayPart(newPlayParts);
    newPlayParts.forEach(loop => loop.start(0));
  }, [loops]);

  const startMusic = () => {
    if (!metronome) {
      const newMetronome = createMetronome();
      setMetronome(newMetronome);
      newMetronome?.start(0);
    }
    if (!playPart) {
      const newPlayParts = initializeLoops(loops);
      setPlayPart(newPlayParts);
      newPlayParts?.forEach(loop => loop.start(0));
    }
    Tone.Transport.scheduleRepeat(UpdateBeatCount, `${PROCESS_SPAN}n`);
    Tone.Transport.start();
    setIsPlaying(true);
    setClickFigureDrawing(false);
  };

  const stopMusic = () => {
    playPart?.forEach(loop => loop.stop());
    metronome?.stop();
    Tone.Transport.stop();
    setBeat(3);
    setMetronome(null);
    setPlayPart(null);
    beatCountRef.current = 0;
    setIsPlaying(false);
    setClickFigureDrawing(false);
  };
  
  return (
    <Stack  spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <StartButton onClick={startMusic} disabled={clickFigureDrawing}/>

        <StopButton onClick={stopMusic} disabled={clickFigureDrawing}/>

        <MinusButton onLongPress={onLongPressMinusButton} disabled={clickFigureDrawing}/>

        <Typography>BPM : {bpm}</Typography>

        <PlusButton onLongPress={onLongPressPlusButton} disabled={clickFigureDrawing}/>
      </Stack>
      <Stack>
        <BeatDisplay beat={beat}/>
      </Stack>
    </Stack>
  );
};
