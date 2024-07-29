import * as Tone from 'tone';
import { RHYTHM_PATTERN_1, RHYTHM_PATTERN_2, RHYTHM_PATTERN_3, RHYTHM_PATTERN_4 } from '../config/constants.tsx';
import { Type } from '../types/loop.tsx';

export const ChangeInstrumentIdToPlayer = (instrumentId: number, type: Type, figureAudioBuffers: AudioBuffer[], volume: number) => {
  if (type === Type.Poligone) {
    const player = new Tone.Player(figureAudioBuffers[instrumentId]).toDestination();
    player.volume.value = volume;
    return player;
  }
}

export const ChangePlayerToLoop = (player: Tone.Player, figure_id: number) => {
  let rhythmPattern;

  switch (figure_id) {
    case 0:
      rhythmPattern = RHYTHM_PATTERN_1;
      break;
    case 1:
      rhythmPattern = RHYTHM_PATTERN_2;
      break;
    case 2:
      rhythmPattern = RHYTHM_PATTERN_3;
      break;
    case 3:
      rhythmPattern = RHYTHM_PATTERN_4;
      break;
    default:
      throw new Error(`Unsupported figure_id: ${figure_id}`);
  }

  const newPart = new Tone.Part((time, value) => {
    player.start(time);
  }, rhythmPattern);

  newPart.loop = true;
  newPart.loopEnd = "1m";
  return newPart;
}
