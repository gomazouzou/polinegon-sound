import React, { useRef, useEffect, useState } from 'react';
import * as Tone from 'tone';

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [linewidth, setLinewidth] = useState(1);
  const [penColor, setPenColor] = useState('black');
  const [canvasColor, setCanvasColor] = useState('white');
  const synthRef = useRef(null);
  const colorNotes = {
    black: "C4",
    red: "D4",
    blue: "E4",
    yellow: "F4",
    green: "G4"
  };

  const startSound = (note) => {
    synthRef.current = new Tone.Synth().toDestination();
    synthRef.current.triggerAttack(note);
  };

  const stopSound = () => {
    if (synthRef.current) {
      synthRef.current.triggerRelease();
      synthRef.current.dispose();
      synthRef.current = null;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    function draw(event) {
      if (!isDrawing) return;

      context.lineWidth = linewidth;
      context.lineCap = 'round';

      if (isErasing) {
        context.strokeStyle = canvasColor;
      } else {
        context.strokeStyle = penColor;
      }

      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
      context.beginPath();
      context.moveTo(event.offsetX, event.offsetY);
    }

    function startDrawing(event) {
      setIsDrawing(true);
      draw(event);

      // 色に対応する音を鳴らす
      if (!isErasing) {
        const note = colorNotes[penColor];
        startSound(note);
      }
    }

    function stopDrawing() {
      setIsDrawing(false);
      context.beginPath();
      stopSound();
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [isDrawing, isErasing, linewidth, penColor, canvasColor]);

  return (
    <div className="App" style={{ padding: '20px' }}>
      <header className="App-header" style={{ marginBottom: '20px' }}>
        <h1>Tone.js with React</h1>
        <button
          onMouseDown={() => startSound("C4")}
          onMouseUp={stopSound}
          onMouseLeave={stopSound}
        >
          Play Sound
        </button>
      </header>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black', backgroundColor: canvasColor }}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setIsErasing(!isErasing)}>
          {isErasing ? 'Disable Eraser' : 'Enable Eraser'}
        </button>
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          type="range"
          min="1"
          max="20"
          value={linewidth}
          onChange={(e) => setLinewidth(parseInt(e.target.value))}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <button
          style={{ backgroundColor: 'black', marginRight: '5px', width: '20px', height: '20px' }}
          onClick={() => setPenColor('black')}
        ></button>
        <button
          style={{ backgroundColor: 'red', marginRight: '5px', width: '20px', height: '20px' }}
          onClick={() => setPenColor('red')}
        ></button>
        <button
          style={{ backgroundColor: 'blue', marginRight: '5px', width: '20px', height: '20px' }}
          onClick={() => setPenColor('blue')}
        ></button>
        <button
          style={{ backgroundColor: 'yellow', marginRight: '5px', width: '20px', height: '20px' }}
          onClick={() => setPenColor('yellow')}
        ></button>
        <button
          style={{ backgroundColor: 'green', width: '20px', height: '20px' }}
          onClick={() => setPenColor('green')}
        ></button>
      </div>
    </div>
  );
}

export default App;
