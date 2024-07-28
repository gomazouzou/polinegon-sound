import React, { useState } from 'react';
import * as Tone from 'tone';

const AudioPlayer = () => {
  const [player, setPlayer] = useState(null);

  const handlePlay = async () => {
    if (!player) {
      const newPlayer = new Tone.Player({
        url: '/src/audio/your-audio-file.wav',
        autostart: true,
      }).toDestination();
      setPlayer(newPlayer);
    } else {
      player.start();
    }
  };

  return (
    <div>
      <button onClick={handlePlay}>Play Audio</button>
    </div>
  );
};

export default AudioPlayer;
