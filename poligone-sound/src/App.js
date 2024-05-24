import React, { useRef, useEffect, useState } from 'react';
import { PlusButton } from './components/buttons/plusButton.tsx';
import { Stack,Button } from '@mui/material';
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [linewidth, setLinewidth] = useState(1);
  const [penColor, setPenColor] = useState('black');
  const [canvasColor, setCanvasColor] = useState('white');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    function draw(event) {
      if (!isDrawing) return;

      // ペンのスタイルを設定
      context.lineWidth = linewidth;
      context.lineCap = 'round';

      if (isErasing) {
        context.strokeStyle = canvasColor; // キャンバスの背景色で消しゴム
      } else {
        context.strokeStyle = penColor; // ペンの色
      }

      // マウスの位置に線を描画
      context.lineTo(event.offsetX, event.offsetY);
      context.stroke();
      context.beginPath();
      context.moveTo(event.offsetX, event.offsetY);
    }

    function startDrawing(event) {
      setIsDrawing(true);
      draw(event);
    }

    function stopDrawing() {
      setIsDrawing(false);
      context.beginPath();
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
    <div
      className="App"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Button
      color="primary"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        cursor: "pointer",
      }}
      startIcon={<AddOutlinedIcon />}
    >
    </Button>

      <Stack>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: '1px solid black', backgroundColor: canvasColor, position: 'absolute', top: 0, left: 0 }}
      />
      <div style={{ position: 'absolute', top: '10px', left: '810px' }}>
        <button onClick={() => setIsErasing(!isErasing)}>
          {isErasing ? 'Disable Eraser' : 'Enable Eraser'}
        </button>
      </div>
      <div style={{ position: 'absolute', top: '60px', left: '810px' }}>
        <input
          type="range"
          min="1"
          max="20"
          value={linewidth}
          onChange={(e) => setLinewidth(parseInt(e.target.value))}
        />
      </div>
      <div style={{ position: 'absolute', top: '90px', left: '810px' }}>
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
          style={{ backgroundColor: 'yellow', width: '20px', height: '20px' }}
          onClick={() => setPenColor('yellow')}
        ></button>
        <button
          style={{ backgroundColor: 'green', width: '20px', height: '20px' }}
          onClick={() => setPenColor('green')}
        ></button>
      </div>
      </Stack>
    </div>
  );
}

export default App;
