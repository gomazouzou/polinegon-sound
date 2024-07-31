import * as Tone from 'tone';
import { RHYTHM_PATTERN_1, RHYTHM_PATTERN_2, RHYTHM_PATTERN_3, RHYTHM_PATTERN_4 } from '../config/constants.tsx';

export const ChangeInstrumentIdToPlayer = (instrumentId: number, figureAudioBuffers: AudioBuffer[], volume: number) => {
  const player = new Tone.Player(figureAudioBuffers[instrumentId]).toDestination();
  player.volume.value = volume;
  return player;
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

export const noteMapping = {
  0: null,
  1: 'G3',
  2: 'A3',
  3: 'C4',
  4: 'D4',
  5: 'E4',
  6: 'G4',
  7: 'A4',
  8: 'C5'
};
interface TonePart {
  time: string;
  note: string;
}

const convertArrayToTonePart = (noteArray: number[]) => {
  const result: TonePart[] = [];
  //一小説分の長さ
  const quantizeNumber = noteArray.length / 2;
  
  noteArray.forEach((value, index) => {
    const note = noteMapping[value];
    if (note) {
      const syousetsu = Math.floor(index / quantizeNumber);
      const beat = (index - syousetsu * quantizeNumber) * 4 / quantizeNumber;
      const time = `${syousetsu}:${beat}:0`;
      result.push({ time, note });
    }
  });
  return result;
};


export const ChangeSamplerToLoop = (sampler: Tone.Sampler, noteArray: number[], volume: number) => {
  const tonePart = convertArrayToTonePart(noteArray);
  sampler.volume.value = volume;
  const newPart = new Tone.Part((time, value) => {
    sampler.triggerAttackRelease(value.note, `${noteArray.length/2}n`, time);
  }, tonePart);

  newPart.loop = true;
  newPart.loopEnd = "2m";
  return newPart;
}

export const ChangeFreePlayerToLoop = (player: Tone.Player, rhythm_array: number[]) => {
  const rhythmPattern = convertArrayToTonePart(rhythm_array);

  const newPart = new Tone.Part((time, value) => {
    player.start(time);
  }, rhythmPattern);

  newPart.loop = true;
  newPart.loopEnd = "1m";
  return newPart;
}
