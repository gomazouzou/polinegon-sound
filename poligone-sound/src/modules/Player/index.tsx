import React, { useEffect, useState } from "react";

import { Stack, Typography } from "@mui/material";
import * as Tone from 'tone';
import { MinusButton } from "../../components/buttons/MinusButton.tsx";
import { PlusButton } from "../../components/buttons/PlusButton.tsx";
import { StartButton } from "../../components/buttons/StartButton.tsx";
import { StopButton } from "../../components/buttons/StopButton.tsx";
import { ChangeInstrumentIdToPlayer, ChangePlayerToLoop, ChangeSamplerToLoop } from "../../hooks/useInstrumentIdToPlayer.tsx";
import { LoopInfo, Type } from "../../types/loop.tsx";
import { BeatDisplay } from "./BeatDisplay/index.tsx";

type Props = {
  loops: LoopInfo[];
  UpdateBeatCount: () => void;
  beatCountRef: React.MutableRefObject<number>;
}

export const Player = ({loops, UpdateBeatCount, beatCountRef}: Props) => {
  const [bpm, setBpm] = useState(120);
  const [beat, setBeat] = useState(7);

  const onClickPlusButton = () => {
    setBpm(bpm + 10);
  }
  const onClickMinusButton = () => {
    setBpm(bpm - 10);
  }

  const [metronomeAudioBuffer, setMetronomeAudioBuffer] = useState <AudioBuffer>();
  const [figureAudioBuffers, setFigureAudioBuffers] = useState <AudioBuffer[]>([]);

  const [lineAudioSamplers, setLineAudioSamplers] = useState <Tone.Sampler[] | null>(null);
  const [figureLoops, setFigureLoops] = useState <Tone.Part[] | null>(null);
  const [metronome, setMetronome] = useState<Tone.Part | null>(null);

  useEffect(() => {
    const loadAudio = async () => {
      const response = await fetch('/audio/metronome.wav');
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await Tone.context.decodeAudioData(arrayBuffer);
      setMetronomeAudioBuffer(buffer);

      const figureBuffers: AudioBuffer[] = [];
      for (let i = 1; i <= 8; i++) {
        const response = await fetch(`/audio/figure_${i}.wav`);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await Tone.context.decodeAudioData(arrayBuffer);
        figureBuffers.push(buffer);
      }
      setFigureAudioBuffers(figureBuffers);

      const lineBuffers: Tone.Sampler[] = [];
      for (let i = 1; i <= 8; i++) {
        const lineAudioSampler = new Tone.Sampler({
          urls: {
            C4: `line_${i}.wav`,
          },
          baseUrl: "/audio/"
        }).toDestination();
        await lineAudioSampler.loaded;
        lineBuffers.push(lineAudioSampler);
      }
      setLineAudioSamplers(lineBuffers);
    };

    loadAudio();
  }, []);

  const createMetronome = () => {
    if (lineAudioSamplers) {
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
    return null;
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
    Tone.Transport.scheduleRepeat(UpdateBeatCount, "16n");
    Tone.Transport.start();
  };

  const stopMusic = () => {
    figureLoops?.forEach(loop => loop.stop());
    metronome?.stop();
    Tone.Transport.stop();
    setBeat(3);
    setMetronome(null);
    setFigureLoops(null);
    beatCountRef.current = 0;
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
